import React from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../App";
import {ErrorMessage} from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {boardGetRequest} from "../../service/board";
import {Footer} from "../Footer/Footer";
import {nextIcon, previousIcon} from "../../images/svg";

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            errorMessage: '',
            page: 0,
            amount: 5
        }
    }

    onLogout = () => {
        localStorage.removeItem('TOKEN');
        this.props.onChangeFlag(false);
        customHistory.push('/signIn')
    };

    componentDidMount() {
        this.props.isFetching(true);
        boardGetRequest()
            .then(response => {
                this.setState({items: response});
                this.props.isFetching(false);
            })
            .catch(error => {
                this.setState({errorMessage: error.message});
                this.props.isFetching(false);
            });
    }

    render() {
        return (
            <div>
                {(this.props.stateFetch === true) ?
                    <Preloader/> :
                    <div className={css.dashboard}>
                        <header className={css.header}>
                            <div>
                                <h1>MiniJira</h1>
                            </div>
                            <div onClick={this.onLogout}>
                                Log Out
                            </div>
                        </header>
                        <main className={css.main}>
                            <div className={css.buttons_and_table}>
                                <table className={css.table}>
                                    <thead>
                                    <tr className={css.tr_head}>
                                        <th></th>
                                        <th>Title</th>
                                        <th>Owner</th>
                                        <th>Key</th>
                                        <th>Category</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.items.slice(this.state.page * this.state.amount, (this.state.page + 1) * this.state.amount).map(item => {
                                        return <tr className={css.tr_body} onClick={() => (customHistory.push(customHistory.push('/tasks')))}>
                                            <td className={css.td_img}>
                                                <img className={css.img} src={item.icon.value}/>
                                            </td>
                                            <td style={{width: '300px'}}>{item.title}</td>
                                            <td style={{width: '120px'}}>{item.owner.name}</td>
                                            <td style={{width: '100px'}}>{item.key}</td>
                                            <td style={{width: '200px'}}>{item.category.value}</td>
                                        </tr>

                                    })}
                                    </tbody>
                                </table>

                                <div className={css.buttons}>
                                    <div className={css.add_field}>
                                        <button className={css.btn} onClick={() => {
                                            customHistory.push('/createBoard')
                                        }}>
                                            Add field
                                        </button>
                                    </div>
                                    <div className={css.previous_next}>
                                        <button className={css.btn + ' ' + css.btn_prev_next + ' ' + css.btn_prev}
                                                onClick={() => {
                                                    this.setState({page: Math.max(this.state.page - 1, 0)})
                                                }}>
                                            <div className={css.svg_prev_next}>
                                                {previousIcon()}
                                            </div>
                                            <div>
                                                Previous
                                            </div>
                                        </button>
                                        <button className={css.btn + ' ' + css.btn_prev_next + ' ' + css.btn_next}
                                                onClick={() => {
                                                    this.setState({page: Math.min(this.state.page + 1, Math.floor(this.state.items.length / 5))})
                                                }}>
                                            <div>
                                                Next
                                            </div>
                                            <div className={css.svg_prev_next}>
                                                {nextIcon()}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                {this.state.errorMessage && <ErrorMessage error={this.state.errorMessage}/>}
                            </div>
                        </main>
                        <Footer/>
                    </div>
                }
            </div>
        );
    }
}
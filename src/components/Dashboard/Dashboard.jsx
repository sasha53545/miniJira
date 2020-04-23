import React from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../App";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {nextPreviousIcon} from "../../images/svg";
import {connect} from "react-redux";
import {requestedBoard} from "../../reducers/board";
import {logged} from "../../reducers/flags";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            amount: 5
        };
    }

    componentDidMount() {
        this.props.requestedBoard();
    }

    render() {
        return (
            <div>
                {(this.props.loader === true) ?
                    <Preloader/> :
                    <div>
                        <header className={css.header}>
                            <div className={css.header_title}>
                                <h1>MiniJira</h1>
                            </div>
                            <div className={css.header_nav}>
                                <div onClick={this.props.onLogout}>
                                    Log Out
                                </div>
                            </div>
                        </header>
                        <main className={css.main}>
                            <div className={css.content}>
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
                                        {this.props.board.slice(this.state.page * this.state.amount, (this.state.page + 1) * this.state.amount).map((item, i) => {
                                            return <tr className={css.tr_body}
                                                       key={i}
                                                       onClick={() => (customHistory.push('/tasks'))}>
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
                                        <div>
                                            <button className={css.btn + ' ' + css.add_field} onClick={() => {
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
                                                <div>
                                                    {nextPreviousIcon()}
                                                </div>
                                                <div className={css.prev_text}>
                                                    Previous
                                                </div>
                                            </button>
                                            <button className={css.btn + ' ' + css.btn_prev_next + ' ' + css.btn_next}
                                                    onClick={() => {
                                                        this.setState({page: Math.min(this.state.page + 1, Math.floor(this.props.board.length / 5))})
                                                    }}>
                                                <div className={css.next_text}>
                                                    Next
                                                </div>
                                                <div className={css.svg_next}>
                                                    {nextPreviousIcon()}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={css.error_message}>
                                    {this.props.errorAuth && <ErrorMessage/>}
                                </div>
                            </div>
                        </main>
                        <footer className={css.footer}>
                            <Footer/>
                        </footer>
                    </div>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        board: state.board.data,
        loader: state.board.loader,
        errorAuth: state.board.error,
    }),
    {
        requestedBoard,
    }
)(Dashboard);

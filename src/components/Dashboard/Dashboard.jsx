import React from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {nextPreviousIcon} from "../../images/svg";
import {connect} from "react-redux";
import {boardsAsyncAction, loaderAction, loggedAction} from "../../reducers/actions";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            amount: 5
        };
    }

    onLogout = () => {
        localStorage.removeItem('TOKEN');
        this.props.loggedAction();
        customHistory.push('/signIn')
    };

    componentDidMount() {
        this.props.loaderAction();
        this.props.boardsAsyncAction();
    }

    render() {
        return (
            <div>
                {(this.props.loader === true) ?
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
                            <div className={css.errorMessage}>
                                {this.props.errorMessage && <ErrorMessage/>}
                            </div>
                        </main>
                        <Footer/>
                    </div>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        board: state.boardsReducer.board,
        errorMessage: state.errorsReducer.errorMessage,
        loader: state.flagsReducer.loader
    }),
    dispatch => ({
        boardsAsyncAction: () => dispatch(boardsAsyncAction()),
        loaderAction: () => dispatch(loaderAction()),
        loggedAction: () => dispatch(loggedAction()),
    })
)(Dashboard);
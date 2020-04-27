import React, {useEffect, useState} from "react";
import css from "./Dashboard.module.css";
import {customHistory} from "../../index";
import ErrorMessage from "../Errors/ErrorMessage/ErrorMessage";
import {Preloader} from "../Preloader/Preloader";
import {Footer} from "../Footer/Footer";
import {nextPreviousIcon} from "../../images/svg";
import {useDispatch, useSelector} from "react-redux";
import {requestedBoard} from "../../reducers/board";
import {requestLocalStorageRemoveItem} from "../../reducers/auth";

const Dashboard = () => {
    const board = useSelector(state => state.board.data);
    const loader = useSelector(state => state.board.loader);
    const error = useSelector(state => state.board.error);
    const dispatch = useDispatch();

    const [tablePage, setTablePage] = useState({
        page: 0,
        amount: 5
    });

    useEffect(() => {
        dispatch(requestedBoard());
    }, [requestedBoard]);

    return (
        <div>
            {(loader === true) ?
                <Preloader/> :
                <div>
                    <header className={css.header}>
                        <div className={css.header_title}>
                            <h1>MiniJira</h1>
                        </div>
                        <div className={css.header_nav}>
                            <div onClick={() => {
                                dispatch(requestLocalStorageRemoveItem('TOKEN'));
                            }}>
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
                                    {board.slice(tablePage.page * tablePage.amount, (tablePage.page + 1) * tablePage.amount).map((item, i) => {
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
                                                    setTablePage({
                                                        ...tablePage,
                                                        page: Math.max(tablePage.page - 1, 0)
                                                    })
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
                                                    setTablePage({
                                                        ...tablePage,
                                                        page: Math.min(tablePage.page + 1, Math.floor(board.length / 5))
                                                    })
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
                                {error && <ErrorMessage/>}
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

export default Dashboard;


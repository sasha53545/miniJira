// import React from "react";
// import css from './Tasks.module.css';
// import {Preloader} from "../Preloader/Preloader";
// import {customHistory} from "../../index";
//
// export class Tasks extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {}
//     }
//
//     render() {
//         return (
//             <div>
//                 {(this.props.stateFetch === true) ?
//                     <Preloader/> :
//                     <div>
//                         <header className={css.header}>
//                             <div className={css.header_title}>
//                                 <h1>MiniJira</h1>
//                             </div>
//                             <div className={css.header_nav}>
//                                 <div onClick={() => {
//                                     customHistory.push('/dashboard')
//                                 }}>
//                                     Back
//                                 </div>
//                                 <div onClick={this.props.onLogout}>
//                                     Log Out
//                                 </div>
//                             </div>
//                         </header>
//                         <main className={css.main}>
//                             tasks
//                         </main>
//                     </div>
//                 }
//             </div>
//         );
//     }
// }

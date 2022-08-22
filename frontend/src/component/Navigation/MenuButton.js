import { useState } from "react";
import { login } from "../../store/session";

// function MenuButton() {
//     const [open, setOpen] = useState(false)
//     return (
//         <li className="nav-item">
//             <a href="#" className="Login" onClick={(e) => setOpen(!open)}>
//                 {open && login}
//             </a>
//         </li>
//     )
// }
// function DropDownMenu() {
//     function DropDownItem(props) {
//         return (
//             <a href="#" className="menu-item">
//                 {props.children}
//             </a>
//         )
//     }
//     return (
//         <div className="dropdown">
//             <DropDownItem> Login</DropDownItem>
//             <DropDownItem> Signup </DropDownItem>
//         </div>
//     )
// }



function Dropdown({ title, items, multiSelect = false }) {
    const [open, setOpen] = useState(false)
    const [selection, setSelection] = useState([])
    const toggle = () => setOpen(!open)

    function handleOnClick(item) { }


    return (
        <div className='dd'>
            <div
                className='dd-header' role={'button'}
                onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)}
            >
                <div className='dd-header-title'>
                    <p className='dd-header-title-bold'>{title}</p>
                </div>

                <div className="dd-header-action">
                    <p>{open ? 'Close' : 'Open'}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list">
                    {items.map(item => (
                        <li className="dd-list-item" key={item.id}>
                            <button type="button" onClick={() => handleOnClick(item)}>
                                <span> Selected... </span>
                                <span> Selected... </span>
                            </button>

                        </li>
                    ))}

                </ul>
            )}


        </div>
    )
}

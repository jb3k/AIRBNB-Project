import { useState } from "react";
import { login } from "../../store/session";

function MenuButton() {
    const [open, setOpen] = useState(false)

    return (
        <li className="nav-item">
            <a href="#" className="Login" onClick={(e) => setOpen(!open)}>
                {open && login}
            </a>
        </li>
    )

}


function DropDownMenu() {

    function DropDownItem(props) {
        return (
            <a href="#" className="menu-item">

                {props.children}

            </a>
        )

    }

    return (
        <div className="dropdown">
            <DropDownItem> Login</DropDownItem>
            <DropDownItem> Signup </DropDownItem>

        </div>
    )
}

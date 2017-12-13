import React from 'react';
import './burgermenu.scss';


export class BurgerMenu extends React.Component {

    constructor(props) {
        super(props);

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu(value) {

        this.props.filterVisible.first = false
        this.props.filterVisible.visible = !this.props.filterVisible.visible
        this.props.filterMenuToggle(this.props.filterVisible)
    }

    render() {
        return (<span className="burger-menu" onClick={this.toggleMenu}>
            <svg height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg">
                <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
            </svg>
        </span>);
    }
}
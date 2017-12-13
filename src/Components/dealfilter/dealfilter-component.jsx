import React from 'react';
import './dealfilter.scss';

class SpeedFilter extends React.Component {

    constructor(props) {
        super(props);

        this.broadbandSpeedFilter = this.broadbandSpeedFilter.bind(this);
    }

    broadbandSpeedFilter(value) {

        this.props.filterState.speed = Number(value.target.value)
        this.props.filterChanged(this.props.filterState)
    }

    render() {
        if (this.props.filterState.productTypes.broadband) {
            return (<div>
                <div>Speed</div>
                <select value={this.props.filterState.speed} onChange={this.broadbandSpeedFilter.bind(this)}>
                    <option value="">Any</option>
                    <option value="17408">17MB</option>
                    <option value="53248">52MB</option>
                    <option value="77824">76MB</option>
                </select></div>)
        } else return (null)
    }
}

class MobileFilter extends React.Component {

    constructor(props) {
        super(props);

        this.mobileSpeedFilter = this.mobileSpeedFilter.bind(this);
    }

    mobileSpeedFilter(value) {

        this.props.filterState.mobileData = Number(value.target.value)
        this.props.filterChanged(this.props.filterState)
    }

    render() {
        //<select value={this.props.filterState.mobileData} onChange={this.props.filterChanged}>

        if (this.props.filterState.productTypes.mobile) {
            return (<div>
                    <div>Mobile Data</div>
                    <select value={this.props.filterState.mobileData} onChange={this.mobileSpeedFilter.bind(this)}>
                        < option value="">Any</option>
                    <option value="4">4GB</option>
                    <option value="5">5GB</option>
                    </select>
                </div >
            )
        } else return (null)
    }
}


export class DealFilter extends React.Component {
    constructor(props) {
        super(props);

        this.changeMobileFilter = this.changeMobileFilter.bind(this);
        this.changeTVFilter = this.changeTVFilter.bind(this);
        //this.handleClick = this.handleClick.bind(this);

        //this.state = {
        //    visible: false
        //};
    }

    changeMobileFilter(value) {

        this.props.filterState.productTypes.mobile = !this.props.filterState.productTypes.mobile
        this.props.filterChanged(this.props.filterState)
    }

    changeTVFilter(value) {

        this.props.filterState.productTypes.tv = !this.props.filterState.productTypes.tv
        this.props.filterChanged(this.props.filterState)
    }

    //handleClick() {
    //    this.setState({ visible: !this.state.visible });

    //    if (this.state.visible) this.style = { display: block }
    //    else this.style = { display: none }
    //}

    render() {
        if (this.props.filterVisible.first) {
            //this.props.filterVisible.first = false
            return (<div className={`deal-filter-menu-first`}>
                <ul>
                    <li><input type="checkbox" disabled checked={true} onChange={this.props.filterChanged} /> Broadband</li>
                    <li><input type="checkbox" checked={this.props.filterState.productTypes.tv} onChange={this.changeTVFilter} /> TV</li>
                    <li><input type="checkbox" checked={this.props.filterState.productTypes.mobile} onChange={this.changeMobileFilter} /> Mo</li>
                </ul>
                <SpeedFilter filterState={this.props.filterState} filterChanged={this.props.filterChanged} />
                <MobileFilter filterState={this.props.filterState} filterChanged={this.props.filterChanged} />
            </div>);
        } else {
            return (<div className={`deal-filter-menu`}>
                <ul>
                    <li><input type="checkbox" disabled checked={true} onChange={this.props.filterChanged} /> Broadband</li>
                    <li><input type="checkbox" checked={this.props.filterState.productTypes.tv} onChange={this.changeTVFilter} /> TV</li>
                    <li><input type="checkbox" checked={this.props.filterState.productTypes.mobile} onChange={this.changeMobileFilter} /> Mo</li>
                </ul>
                <SpeedFilter filterState={this.props.filterState} filterChanged={this.props.filterChanged} />
                <MobileFilter filterState={this.props.filterState} filterChanged={this.props.filterChanged} />
            </div>);
        }

        //return (<div className={`deal-filter-menu`}>
        //    <ul>
        //        <li><input type="checkbox" disabled checked={true} onChange={this.props.filterChanged} /> Broadband</li>
        //        <li><input type="checkbox" checked={this.props.filterState.productTypes.tv} onChange={this.changeTVFilter} /> TV</li>
        //        <li><input type="checkbox" checked={this.props.filterState.productTypes.mobile} onChange={this.changeMobileFilter} /> Mo</li>
        //    </ul>
        //    <SpeedFilter filterState={this.props.filterState} filterChanged={this.props.filterChanged} />
        //    <MobileFilter filterState={this.props.filterState} filterChanged={this.props.filterChanged} />
        //</div>);
    }

}
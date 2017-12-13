import React from 'react';
import './broadbandgrid-component.scss';

class PopularChannels extends React.Component {
    render() {
        return (
            <div><img src={this.props.channel.logo} /></div>
        )
    }
}

class MobileColumn extends React.Component {
    render() {
        if (this.props.mobile) {
            return (
                <td className="broadband-grid__deal__property">
                    Data: {this.props.mobile.data.label} <br />
                    Minutes: {this.props.mobile.minutes.label} <br />
                    Texts: {this.props.mobile.texts.label} <br />
                    Connection: {this.props.mobile.connectionType.label}
                </td>
            )
        } else {
            return (<td  className="broadband-grid__deal__property"> N/A </td>)
        }
    }
}
class BroadbandGridRow extends React.Component {
    render() {
        let tvChannels = [];
        if (!this.props.deal.popularChannels || this.props.deal.popularChannels.length == 0) tvChannels.push('N/A');
        else {
            this.props.deal.popularChannels.forEach((channel, index) => {
                tvChannels.push(<PopularChannels key={index} channel={channel} />)
            })
        }

        return (
            <tr className="broadband-grid__deal">
                <td className="broadband-grid__deal__property">{this.props.deal.title}</td>
                <td className="broadband-grid__deal__property">{this.props.deal.contractLength}months</td>
                <td className="broadband-grid__deal__property">{this.props.deal.speed.label}MB <br /> {this.props.deal.usage.label}</td>
                <td className="broadband-grid__deal__property"><img src={this.props.deal.offer.smallLogo} /></td>
                <td className="broadband-grid__deal__property">{tvChannels}</td>
                <MobileColumn mobile={this.props.deal.mobile} />
                <td className="broadband-grid__deal__property">£{this.props.deal.prices[0].totalContractCost}</td>
            </tr>
        )
    }
}

export class BroadbandGrid extends React.Component {
    render() {
        var rows = [];
        if (this.props.deals) {
            this.props.deals.forEach((deal, index) => {
                rows.push(<BroadbandGridRow key={index} deal={deal} />)
            })
        }
        return (<div>
            <table className="broadband-grid">
                <thead className="broadband-grid__headings">
                    <tr>
                        <th>About</th>
                        <th>contract length</th>
                        <th>speed/usage</th>
                        <th>Offer</th>
                        <th>TV</th>
                        <th>Mobile</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody className="broadband-grid__section">
                    {rows}
                </tbody>
            </table>

        </div>)
    }
}

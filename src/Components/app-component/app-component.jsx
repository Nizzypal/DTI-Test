import React from 'react';
import './app-component.scss';
import { SiteNav } from '../sitenav/sitenav-component';
import { BroadbandGrid } from '../broadbandgrid/broadbandgrid-component'
import { DealFilter } from '../dealfilter/dealfilter-component';

var service = function () {
  return {
    fetchDeals: () => {
      return fetch('/assets/deals.json')
        .then(res => res.json())
        .then(rest => rest.deals)
    }
  }

}();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        //'deals': [], responsiveVisible: false, filterVisible: {visible:true}, filterState: {
        'deals': [], responsiveVisible: false, filterVisible: { visible: true, first: true }, filterState: {
        productTypes:
        {
          broadband: true,
          tv: true,
          mobile: true,
        }
      }
    };

    service.fetchDeals().then(deals => {
      this.setState({ 'deals': deals })
    })

    this.filterChanged = this.filterChanged.bind(this)
    this.filterDeals = this.filterDeals.bind(this)
    //this.filterMenuToggle = this.filterMenuToggle(this)
  }

  filterChanged(value) {

      const tempState = [
          ...this.state.filterState
      ]

      this.setState({ tempState });

      this.filterDeals(this.state.filterState);

      console.log(value);

  }

  filterDeals(filter) {
     return this.state.deals.filter(function (day) {

          var returnTV = filter.productTypes.tv;
          var returnMobile = filter.productTypes.mobile;

          if (returnTV && !returnMobile) {

              var cond1, cond2, wrongCond = false;
              //var cond2 = false;
             // var wrongCond = false;

              day["productTypes"].forEach(function (item, index, arr) {
                  if (item.indexOf("Broadband") > -1) cond1 = true;
                  if (item.indexOf("TV") > -1) cond2 = true;
                  if (item.indexOf("Mobile") > -1) wrongCond = true;
              });

              //if (cond1 && cond2 && (!wrongCond)) return day;
              if (cond1 && cond2 && (!wrongCond)) {
                  if (filter.speed == "" || filter.speed == 0 || filter.speed == undefined) return day
                  else if (day["speed"]["sortValue"] == filter.speed) return day;
              }

          } else if (!returnTV && returnMobile) {
              var cond1, cond2, wrongCond = false;
              var mobileSize = "";

              day["productTypes"].forEach(function (item, index, arr) {
                  if (item.indexOf("Broadband") > -1) cond1 = true;
                  if (item.indexOf("Mobile") > -1) cond2 = true;
                  if (item.indexOf("TV") > -1) wrongCond = true;
              });

              if (cond1 && cond2 && (!wrongCond)) {
                  if ((filter.mobileData == "" || filter.mobileData == 0 || filter.mobileData == undefined) && (filter.speed == "" || filter.speed == 0 || filter.speed == undefined)) return day
                  else if ( day["mobile"]["data"]["sortValue"] == filter.mobileData) return day;
              }

          } else if (returnTV && returnMobile) {
              var cond1 = false;
              var cond2 = false;
              var mobileSize = "";

              day["productTypes"].forEach(function (item, index, arr) {
                  if (item.indexOf("TV") > -1) cond1 = true;
                  if (item.indexOf("Mobile") > -1) cond2 = true;
              });

              if (cond1 && cond2) {
                  //if (filter.mobileData == "" || filter.mobileData == 0 || filter.mobileData == undefined) return day
                  if ((filter.mobileData == "" || filter.mobileData == 0 || filter.mobileData == undefined) && (filter.speed == "" || filter.speed == 0 || filter.speed == undefined)) return day
                  else if (day["mobile"]["data"]["sortValue"] == filter.mobileData) return day;
              }
          } else if (!returnTV && !returnMobile) {
              var wrongCond = false;

              day["productTypes"].forEach(function (item, index, arr) {
                  if (item.indexOf("Mobile") > -1 || item.indexOf("TV") > -1) wrongCond = true;
              });

              if (!wrongCond) {
                  if (filter.speed == "" || filter.speed == 0 || filter.speed == undefined) return day
                  else if (day["speed"]["sortValue"] == filter.speed) return day;
              }
          } else return day;

      })
  }

  //filterMenuToggle(value) {
  //    const tempState = [
  //        ...this.state.filterVisible
  //    ]

  //    this.setState({ tempState });

  //    //this.forceUpdate()

  //    console.log(value);
  //}

  render() {
      // <SiteNav filterMenuToggle={this.filterMenuToggle.bind(this)} filterVisible={this.state.filterVisible} />
      //                  <SiteNav filterMenuToggle={this.filterChanged.bind(this)} filterVisible={this.state.filterVisible}/>
      //<div className="deals-layout">
      //    <DealFilter filterChanged={this.filterChanged.bind(this)} filterState={this.state.filterState} filterVisible={this.state.filterVisible} />

      if (this.state.filterVisible.visible) {
          return (
              <div className="app">
                  <SiteNav filterMenuToggle={this.filterChanged} filterVisible={this.state.filterVisible}/>
                  <div className="deals-layout">
                      <DealFilter filterChanged={this.filterChanged} filterState={this.state.filterState} filterVisible={this.state.filterVisible}/>
                      <div className="deals-layout__grid" >
                          <BroadbandGrid deals={this.filterDeals(this.state.filterState)} />
                      </div>
                  </div>
              </div>);
      }
      else {
          return (
              <div className="app">
                  <SiteNav filterMenuToggle={this.filterChanged.bind(this)} filterVisible={this.state.filterVisible} />
                  <div className="deals-layout">
                      <div className="deals-layout__grid" >
                          <BroadbandGrid deals={this.filterDeals(this.state.filterState)} />
                      </div>
                  </div>
              </div>);
      }
  }

}
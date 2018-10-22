import React, { Component } from 'react';
import 'react-table/react-table.css';
import './App.css';
import ssp from './data/ssp.json';
import north from './data/north.json';
import central from './data/central.json';
import south from './data/south.json';
import east from './data/east.json';
import wc from './data/wc.json';
import tw from './data/tw.json';

// Kowloon
import kc from './data/kc.json';
import kt from './data/kt.json';
import wts from './data/wts.json';
import ytm from './data/ytm.json';

import ReactTable from "react-table";
import { FaHome, FaFacebook, FaTwitter, FaGithub } from 'react-icons/fa';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-82689420-4');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {district: 'ssp', index: 0, districtLabel: '深水埗'};
    this.change = this.change.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    ReactGA.event({
      category: 'home',
      action: 'home'
    }); 
  }

  onClick(index) {
    this.setState({...this.state, index: index});
  }

  change(evt) {
    const {options, selectedIndex} = evt.target;
    const districtLabel = options[selectedIndex].innerHTML;
    this.setState({district: evt.target.value, index: 0, districtLabel: districtLabel});
  }

  render() {
    let data = ssp;
    const { district, index, districtLabel } = this.state;
    
    console.log(this.state);
    if (district === 'north') {
      data = north;
    }
    if (district === 'central') {
      data = central;
    }
    if (district === 'tw') {
      data = tw;
    }
    if (district === 'east') {
      data = east;
    }

    if (district === 'south') {
      data = south;
    }

    if (district === 'wc') {
      data = wc;
    }

    if (district === 'kt') {
      data = kt;
    }

    if (district === 'kc') {
      data = kc;
    }

    if (district === 'ytm') {
      data = ytm;
    }

    if (district === 'wts') {
      data = wts;
    }



    const category = data.tree['children'][index]['name'];

    ReactGA.event({
      category: 'home',
      action: 'view',
      label: districtLabel + '-' + category
    }); 

    const columns = [{
      Header: '委員會',
      accessor: 'committee',
      width: 200,
    }, {
      Header: '文件',
      id: 'title',
      Cell: (d => { d = d.original; return (<a target='_blank' rel='noopener noreferrer' href={d.link}>{d.no} - {d.name}</a>);}),
    }];
    return (
      <div>
        <div className="header">
          <div>
            <h1>
              <a href="/"><FaHome /></a>&nbsp;g0vhk<br/>區議會文件分類器
              &nbsp;
              <a href="https://www.facebook.com/g0vhk.io" target="blank">
                <FaFacebook />
              </a>
              &nbsp;
              <a href="https://twitter.com/g0vhk" target="blank">
                <FaTwitter />
              </a>
              &nbsp;
              <a href="https://github.com/g0vhk-io" target="blank">
                <FaGithub />
              </a>
            </h1>
          </div>
        </div>
        <div className="app">
          <div className="menu">
            <div className="select_container">
              <h2>選擇&nbsp;
                <select onChange={this.change}>
                  <option value="ssp">深水埗</option>
                  <option value="north">北區</option>
                  <option value="central">中西區</option>
                  <option value="tw">荃灣</option>
                  <option value="east">東區</option>
                  <option value="south">南區</option>
                  <option value="wc">灣仔</option>
                  <option value="kt">觀塘區</option>
                  <option value="kc">九龍城區</option>
                  <option value="ytm">油尖旺區</option>
                  <option value="wts">黃大仙區</option>
                </select>
              </h2>
              <table>
                {data.tree['children'].map((d, i) => (<tr><td><span index={i} onClick={() => this.onClick(i)}>{d['name']}(共{d['total']}個)</span></td></tr>))}
              </table>
            </div>
          </div>
          <div className="list">
            <h1>&nbsp;&nbsp;&nbsp;{districtLabel}的{category}的文件</h1>
            <ReactTable
              showPaginationTop={true}
              showPaginationBottom={false}
              data={data.docs[index]}
              columns={columns}
              pageSizeOptions={[20]}
              showPageSizeOptions={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

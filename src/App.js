import React, { Component } from 'react';
import 'react-table/react-table.css';
import './App.css';
/* eslint-disable import/first */

const dataMap = {
    'north': require('./data/north.json'),
    'ssp': require('./data/ssp.json'),
    'central': require('./data/central.json'),
    'tw': require('./data/tw.json'),
    'east': require('./data/east.json'),
    'south': require('./data/south.json'),
    'wc': require('./data/wc.json'),
    'kc': require('./data/kc.json'),
    'ytm': require('./data/ytm.json'),
    'wts': require('./data/wts.json'),
    'kt': require('./data/kt.json'),
    'island': require('./data/island.json'),
    'yl': require('./data/yl.json'),
    'st': require('./data/st.json'),
    'sk': require('./data/sk.json'),
    'kwt': require('./data/kwt.json'),
    'tp': require('./data/tp.json'),
    'tm': require('./data/tm.json')
};

const districts = {
    'north': '北區',
    'ssp': '深水埗區',
    'central': '中西區',
    'tw': '荃灣區',
    'east': '東區',
    'south': '南區',
    'wc': '灣仔區',
    'kc': '九龍城區',
    'ytm': '油尖旺區',
    'wts': '黃大仙區',
    'kt': '觀塘區',
    'island': '離島區',
    'yl': '元朗區',
    'st': '沙田區',
    'sk': '西貢區',
    'kwt': '葵青區',
    'tp': '大埔區',
    'tm': '屯門區'
};



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
    const { district, index, districtLabel } = this.state;
    const data = dataMap[district]
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
                  {
                    Object.keys(districts).map((key, index) => 
                      <option value={key}>{districts[key]}</option>
                    )
                  }
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

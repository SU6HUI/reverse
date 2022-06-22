import React, { Component, Fragment } from 'react'

const img1 = require('../../../dist/1.jpg')
const img2 = require('../../../dist/2.jpg')
const img3 = require('../../../dist/3.jpg')
const img4 = require('../../../dist/4.jpg')
const img5 = require('../../../dist/5.jpg')

export default class index extends Component {
  constructor() {
    super()
    this.state = {
      imgList: [],
      imgArr: [
        img1,
        img2,
        img3,
        img4,
        img5
      ]
    }
  }
  componentDidMount() {
    console.log(this.state.imgArr);
  }

  render() {
    return (
      <Fragment>
        {
          this.state.imgArr.map(item => {
            <img src={item} />
          })
        }
      </Fragment>
    )
  }
}

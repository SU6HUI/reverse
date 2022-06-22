import React from 'react'

export default function FunctionComponent() {
    let [number, setNumber] = React.useState(0)
    const handleClick = () => {
        setTimeout(() => {
            console.log(number);
        }, 3000)
        setNumber(number + 1)
    }
    return (
        <div>
            <p>{number}</p>
            <button onClick={handleClick}> + </button>
        </div>
    )
}

// import React, { Component } from 'react'

// export default class FunctionComponent extends Component {
//     state = {
//         number: 0
//     }
//     handleClick = () => {
//         setTimeout(() => {
//             console.log(this.state.number);
//         }, 3000)
//         this.setState({ number: this.state.number + 1 })
//     }
//     render() {

//         return (
//             <div>
//                 <p>{this.state.number}</p>
//                 <button onClick={this.handleClick}> + </button>
//             </div>
//         )
//     }
// }


// import React, { Component, Fragment } from 'react'

// export default class Grade extends Component {
//   constructor(props) {
//     super(props);
//     this.parentRef = React.createRef();
//     this.childRef = React.createRef();
//   }
//   componentDidMount() {
//     console.log("React componentDidMount！");
//     this.parentRef.current?.addEventListener("click", (e) => {
//       console.log("原生事件：父元素 DOM 事件监听！");
//     });
//     this.childRef.current?.addEventListener("click", (e) => {
//       console.log("原生事件：子元素 DOM 事件监听！");
//     });
//     document.addEventListener("click", (e) => {
//       console.log("原生事件：document DOM 事件监听！");
//     });
//   }
//   parentClickFun = (e) => {
//     console.log("React 事件：父元素事件监听！");
//   };
//   childClickFun(e) {
//     console.log("React 事件：子元素事件监听！");
//   };
//   render() {
//     return (
//       <div ref={this.parentRef} onClick={this.parentClickFun}>
//         <div ref={this.childRef} onClick={this.childClickFun}>
//           分析事件执行顺序
//         </div>
//       </div>
//     );
//   }
// }

import React, { useRef, useEffect } from 'react'
function Grade() {
  const parentRef = useRef(null)
  const childRef = useRef(null)

  useEffect(() => {
    parentRef.current?.addEventListener("click", (e) => {
      console.log("原生事件：父元素 DOM 事件监听！");
    });
    childRef.current?.addEventListener("click", (e) => {
      console.log("原生事件：子元素 DOM 事件监听！");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
  })


  const parentClickFun = (e) => {
    console.log("React 事件：父元素事件监听！");
  };
  const childClickFun = (e) => {
    console.log("React 事件：子元素事件监听！");
  };
  return (
    <div ref={parentRef} onClick={parentClickFun}>
      <div ref={childRef} onClick={childClickFun}>
        分析事件执行顺序
      </div>
    </div>
  );
}

export default Grade

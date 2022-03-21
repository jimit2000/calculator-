import React, { useState, useRef, useLayoutEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const App = () => {
  const [calData, setCalData] = useState("");
  const [historyState, setHistory] = useState(false);

  const [value, setValue] = useLocalStorage("data",[""]);
  const historyData = useRef();
  const btnArray = [
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "-",
    "7",
    "8",
    "9",
    "*",
    "C",
    "0",
    "=",
    "/",
  
  ];
  const checkOp = (arr) => {
    // console.log(arr);
    const r = arr.find((val) => ["+", "-", "*", "/"].includes(val));
    return r ? true : false;
  };

  //Evaluate input as per the user click on value 
  const inpVal = (e) => {
    let { value } = e.target;

    if (["+", "-", "*", "/"].includes(value)) {
      if (calData === "") {
        // to check data is emprty or not
        setCalData(calData + value);
      } else if (checkOp((calData + "").split(" "))) {
        // it will check if user already have operator
        alert("Enetr number or click on = ");
        // setCalData(calData + value);
      } else {
        setCalData(calData + " " + value + " ");
      }

      //    setCalData(calData+" "+value+" ");
    } else if (value.includes("=")) {
      let res = calData.split(" ");
      const op = res[1];
      let result = "";
      let resData = "";

      if(res.includes("")){
        alert("error in input");
        setCalData("");
        return

      }

      switch (op) {
        case "+":
          resData = parseInt(res[0]) + parseInt(res[2]);
          setCalData(resData);
          result = res[0] + " " + res[1] + " " + res[2] + " = " + resData;
          setValue((prev) => {
            return [...prev, result];
          });

          break;
        case "-":
          resData = parseInt(res[0]) - parseInt(res[2]);
          setCalData(resData);
          result = res[0] + " " + res[1] + " " + res[2] + " = " + resData;
          // console.log(result);
          setValue((prev) => {
            return [...prev, result];
          });
          // console.table(value);;

          break;
        case "*":
          resData = parseInt(res[0]) * parseInt(res[2]);
          setCalData(resData);
          result = res[0] + " " + res[1] + " " + res[2] + " = " + resData;
          // console.log(result);
          setValue((prev) => {
            return [...prev, result];
          });
          // console.table(value);
          break;
        case "/":
          if (parseInt(res[2]) === 0) {
            // setCalData("Error");
              alert("Numeber is not devided by zero");
              setCalData("");
          } else {
            resData = parseInt(res[0]) / parseInt(res[2]);
            setCalData(resData);
            result = res[0] + " " + res[1] + " " + res[2] + " = " + resData;
            // console.log(result);
            setValue((prev) => {
              return [...prev, result];
            });
            // console.table(value);
          }

          break;
        default:
          alert("error in input");
          setCalData("");
          return
      }
    } else {
      setCalData(calData + value);
    }
  };

  useLayoutEffect(() => {
    if (historyState) {
      historyData.current.style.width = "40%";
      historyData.current.style.overflow = "";
    } else {
      historyData.current.style.width = 0;
      historyData.current.style.overflow = "hidden";
    }
  }, [historyState]);

  const toggleHistory = () => {
    setHistory(!historyState);
  };

  return (
    <>
      <div className="mainDiv">
        <div ref={historyData} className="history">
          <div className="close" onClick={toggleHistory}>
            &times;
          </div>
          <div className="showHistory">
            <h1>History</h1>
            {value.map((data, i) => {
              return (
                <React.Fragment key={i}>
                  <p >{data}</p>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="humburgermenu" onClick={toggleHistory}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="calDiv">
          <input type="text" disabled value={calData} />
          <div className="btnDiv">
            {btnArray.map((val, i) => {
              if (val === "C") {
                return (
                  <input
                    type="text"
                    readOnly="readonly"
                    key={i}
                    onClick={() => setCalData("")}
                    value="C"
                  />
                );
              } else {
                return (
                  <input
                    type="text"
                    readOnly="readonly"
                    key={i}
                    onClick={inpVal}
                    value={val}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

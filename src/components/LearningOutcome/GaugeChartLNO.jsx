"use client";
import GaugeComponent from 'react-gauge-component';

const MyGaugeChart = ({ value }) => {
  return (
    <>
        <GaugeComponent
  type="semicircle"
  arc={{
    width: 0.4,
    padding: 0.005,
    cornerRadius: 2,
    // gradient: true,
    subArcs: [
      {
        limit: 0,
        color: '#FF0000',
        showTick: true,
        tooltip: {
          text: 'Kém'
        }
        // ,
        // onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
        // onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
        // onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
      }
      ,
      {
        limit: 3,
        color: '#DF0707',
        showTick: true,

        tooltip: {
          text: 'Kém'
        }
      }
      
      
      ,
      {
        limit: 5.0,
        color: '#FF0000',
        showTick: true,
        tooltip: {
          text: 'Yếu'
        }
      },
      {
        limit: 7.0, color: '#EBEB0B', showTick: true,
        tooltip: {
          text: 'Trung bình'
        }
      },
      {
        limit: 8.0,color: '#FFA500',showTick: true,
        tooltip: {
          text: 'Khá'
        }
      },
      {
        limit: 9.0,color: '#008000',showTick: true,
        tooltip: {
          text: 'Giỏi'
        }
      },
      {
        limit: 10.0,color: '#07D707',showTick: true,
        tooltip: {
          text: 'Xuất sắc'
        }
      }
    ]
  }}
  pointer={{
    color: 'black',
    length: 0.80,
    width: 10,
    // elastic: true,
  }}
  labels={{
    valueLabel: { formatTextValue: value => value  },
    tickLabels: {
      type: 'outer',
      defaultTickValueConfig: { 
        formatTextValue: (value) => value,
        style: {fontSize: 20,fontWeight:"bold"}
    },
      ticks: [
        { value: 0 },
        { value: 6.5 },
        { value: 10 }
      ],
    }
  }}
  value={6.5}
  minValue={0}
  maxValue={10.0}
/>
    
    </>
  );
};

export default MyGaugeChart;
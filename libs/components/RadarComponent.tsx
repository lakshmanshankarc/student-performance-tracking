"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, RadialLinearScale, Tooltip, Legend, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Radar } from 'react-chartjs-2';
import { randomColorGenerator } from '@/utils/main';
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend);
function RadarComponent({ data }: any) {
  return (
    <div>
      {data &&
        Object.values(data).map((item: any) => {
          return (
            <div className='w-full flex bg-slate-50 h-full py-10 rounded-md overflow-scroll px-10 m-5 ' key={item}>
              <h1 className=' font-extrabold text-center text-3xl ml-5'>{item.id}</h1>
              <RadarChart data={item.test} label={item.test.map((itemla: any) => { return itemla.label })} name={item.test.map((x: any) => { return x.name })} />
              {item.test.map((item: any) => {
                return (
                  <div className=' w-full'>

                    <div className="dropdown dropdown-right">
                      <label tabIndex={0} className="btn m-1 bg-slate-500 text-white absolute">More Info</label>
                      <ul tabIndex={0} className="dropdown-content menu p-2 bg-base-100 rounded-box w-52 shadow-xl">
                        <li className=' w-full text-2xl font-serif text-teal-500 text-center'>{item.name}</li>
                        <li className=' w-full text-md font-serif text-teal-500 text-center'>{Math.round(item.total)} Total</li>
                        <li className=' flex w-full flex-col border-0 dropdown-left dropdown '>
                          {item.data.map((dataItem: any, index: number) => {
                            return (
                              <div className='flex w-full p-0 m-0'>
                                <li><Colorizer mark={dataItem} /></li>
                                <li>{item.label[index]}</li>
                              </div>
                            )
                          })}
                        </li>
                      </ul>
                    </div>
                    <PieChart data={item.data} label={item.label} name={item.name} />

                  </div>
                )
              })}

            </div>
          )
        })
      }
    </div>
  )
}

export default RadarComponent

function PieChart({ data, label, name }: { data: Array<number>, label: Array<string>, name: string }) {
  const Data = {
    labels: label,
    datasets: [
      {
        label: name,
        data: data,
        backgroundColor: randomColorGenerator(data.length, 1),
        borderColor: randomColorGenerator(data.length, 1),
        borderWidth: 0.2,
      },
    ],
  };
  return (
    <div className=' static-with p-10 rounded-xl m-5 shadow-lg' >
      <Doughnut data={Data} />
    </div>
  )
}


function RadarChart({ data, label, name }: { data: Array<Array<number>>, label: Array<Array<string>>, name: string }) {

  const datset = data.map((item: any) => {
    return {
      label: item.name,
      data: item.data,
      backgroundColor: randomColorGenerator(item.data.length, 0.63),
      borderColor: randomColorGenerator(item.data.length, 0.5),
      borderWidth: 0.2,
    }
  })
  const localdata = {
    labels: label[0],
    datasets: datset,
  };
  return (
    <div className='static-with-center p-10 rounded-xl m-5 shadow-lg'>
      < Radar data={localdata} />;
    </div >
  )
}


function Colorizer({ mark }: { mark: number }) {
  if (mark < 40) {
    return (
      <i className=' text-red-500'>{mark}</i>
    )
  }
  else {
    return (
      <i className={` text-teal-400 `}>{mark}</i>
    )
  }
}

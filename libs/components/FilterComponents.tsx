"use client";
import axios from "axios";
import {
  firstCSI,
  firstCSII,
  secondCSI,
  secondCSII,
  thirdCSI,
  thirdCSII,
} from "@/types/collegeTables";
// import { FirstCSI, FirstCSII, SecondCSI, Sec:ondCSII, ThirdCSI, ThirdCSII, resolveTableName } from '@/utils/main'
import React, { useState, useEffect } from "react";
import { destructIdAndTest, calculateTotalMarks } from "@/utils/main";
import RadarComponent from "./RadarComponent";

interface DataItem {
  id: number;
  tests: string[];
}
function FilterComponents() {
  const [Markstable, setMarkstable] = useState<
    | firstCSI[]
    | firstCSII[]
    | secondCSI[]
    | secondCSII[]
    | thirdCSI[]
    | thirdCSII[]
  >([]);
  const [order, setOrder] = useState<string>('testname');
  const [Student, SetStudent] = useState<any>();
  useEffect(() => {
    let res = getStudents();
    res.then((data) => {
      SetStudent(data)
    })
  }, [order]);

  async function getStudents() {
    try {
      const response = await axios.get("/api/marks/getstudentmarks", {
        params: {
          orderby: "testname"
        }
      });
      setMarkstable(response.data);
      const Data: any[] = []
      const mergedData: Record<number, DataItem> = {};
      const mapdata = response.data.map((item: any) => {
        const testname = item.testname
        const id = item.id;
        const result = destructIdAndTest(item);
        const length = Object.keys(result.others).length
        const objtolist = Object.values(result.others).map((item: any) => Number(item))
        const objtolistkey = Object.keys(result.others).map((item: any) => item)
        const total = calculateTotalMarks(result.others) / length

        const localData = {
          id, test: [{
            name: testname,
            data: objtolist,
            label: objtolistkey,
            total: total
          }]
        }
        Data.map((mainid) => {
          if (mainid === id) {
            mainid.test.push({
              name: testname,
              data: objtolist,
              label: objtolistkey,
              total: total
            })
          }
        })
        Data.push(localData)
      });

      const data = Data;
      data.forEach((item) => {
        if (item.id in mergedData) {
          // @ts-ignore
          mergedData[item.id].test = [...new Set([...mergedData[item.id].test, ...item.test])];
        } else {
          mergedData[item.id] = { ...item };
        }
      });
      return mergedData
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h1>
        <RadarComponent data={Student} />
      </h1>
    </div>
  )
}

export default FilterComponents

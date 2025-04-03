import FilterBoard from "./FilterBoard";
import { IoEyeSharp } from "react-icons/io5";
import styled from "styled-components";
import { useState, useEffect } from "react";
const LearningOutcomeBody = styled.div`
  display:flex;
  flex-direction: column;
  gap:1rem;
  
`

const TableContainer = styled.div`
    
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    height:600px;
    overflow-y:auto;
`
const NoContent = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    font-size:1.5rem;
    font-weight:bold;


`
const TableHeader = ["STT","MSSV","Tên","Email","Chương trình","Chuyên ngành","Khoa","Hành Động"];
const TableContent = [
    {
        "ID":"1",
        "MSSV":"21127637",
        "Name": "21CLC08",
        "Email":2021,
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    },
    {
        "ID":"2",
        "MSSV":"21127638",
        "Name": "ABC",
        "Email":"2021@GMAIL.COM",
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    },
    {
        "ID":"3",
        "MSSV":"21127638",
        "Name": "ABC",
        "Email":"2021@GMAIL.COM",
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    }
    ,
    {
        "ID":"4",
        "MSSV":"21127639",
        "Name": "ABC",
        "Email":"2021@GMAIL.COM",
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    }
    ,
    {
        "ID":"5",
        "MSSV":"21127640",
        "Name": "ABC",
        "Email":"2021@GMAIL.COM",
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    }
    ,
    {
        "ID":"6",
        "MSSV":"21127641",
        "Name": "ABC",
        "Email":"2021@GMAIL.COM",
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    }
    ,
    {
        "ID":"7",
        "MSSV":"21127642",
        "Name": "ABC",
        "Email":"2021@GMAIL.COM",
        "Program":"Chất Lượng Cao",
        "Specialized":"Hệ Thống Thông Tin",
        "Falculity":"Công nghệ thông tin",
        
    }



]





export default function StudentListLNO({userID,classID,subjectID,setStudentID}){


    return(
        <>
            <LearningOutcomeBody>
            
            
                      <div className="LearningOutComeTabFilterBody-Container">
                        <FilterBoard></FilterBoard>
                      </div>
            
                      <TableContainer>
                        <table className="tableLNO">
                          <thead className="thTable">
                              <tr className="trTable">  
                                  {TableHeader.map((TableHeaderItems,index)=>{
                                    return <th className="thTable" key={index}> {TableHeaderItems}</th>;
                                  })}
                              </tr>
                          </thead>
                        {
                            TableContent.length>0? //HANDLE KO CO DATA NE

                          <tbody className="tbodyTable">
            
                            {TableContent.map((items,index)=>{
                              return<>
                                <tr className="trTable" key={index}>
                                    <td className="tdTable">{index+1}</td>
                                    <td className="tdTable">{items.MSSV}</td>
                                    <td className="tdTable">{items.Name}</td>
                                    <td className="tdTable">{items.Email}</td>
                                    <td className="tdTable">{items.Program}</td>
                                    <td className="tdTable">{items.Specialized}</td>
                                    <td className="tdTable">{items.Falculity}</td>
                                    <td className="tdTable" onClick={()=>setStudentID(items.ID)}>
                                      <IoEyeSharp id="eye-icon" ></IoEyeSharp>
                                    </td>
            
                                  </tr>
                                </>
                            })}
            
                          </tbody>
                          :
                          <NoContent>
                            Chưa có dữ liệu
                            </NoContent>
                        }
                      </table>

                    </TableContainer>
                      
                    </LearningOutcomeBody>
        
        
        
        </>
    )



}
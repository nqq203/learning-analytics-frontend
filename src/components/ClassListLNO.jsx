import FilterBoard from "./FilterBoard";
import { IoEyeSharp } from "react-icons/io5";
import styled from "styled-components";

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
const TableHeader = ["STT","Lớp","Khóa","Chương trình","Khoa","Chuyên ngành","Hành Động"];
const TableContent = [{
  "ID":"1",
  "ClassName": "21CLC08",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Không"
},
{
  "ID":"2",
  "ClassName": "21HTTT1",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},
{
  "ID":"3",
  "ClassName": "21HTTT2",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"4",
  "ClassName": "21HTTT3",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"5",
  "ClassName": "21HTTT4",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"6",
  "ClassName": "21HTTT5",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
}
,{
  "ID":"7",
  "ClassName": "21HTTT1",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},
{
  "ID":"8",
  "ClassName": "21HTTT2",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"9",
  "ClassName": "21HTTT3",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"10",
  "ClassName": "21HTTT4",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"11",
  "ClassName": "21HTTT5",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
},

{
  "ID":"12",
  "ClassName": "21HTTT1",
  "ClassOf":2021,
  "Program":"Chất Lượng Cao",
  "Falculity":"Công nghệ thông tin",
  "Specialized":"Hệ thống thông tin"
}
]




export default function ClassListLNO({userId,setClassID}){

    
    const HandleClickClass=(Classid)=>{
        setClassID(Classid);

    }
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
                                      <td className="tdTable">{items.ClassName}</td>
                                      <td className="tdTable">{items.ClassOf}</td>
                                      <td className="tdTable">{items.Program}</td>
                                      <td className="tdTable">{items.Falculity}</td>
                                      <td className="tdTable">{items.Specialized}</td>
              
                                      <td className="tdTable" onClick={()=>{HandleClickClass(items.ID)}}>
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
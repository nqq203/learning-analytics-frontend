"use client";

const scores = [
    { name: "Quizz 1", score: 9.7 },
    { name: "Quizz 2", score: 9.7 },
    { name: "Quizz 3", score: 9.7 },
    { name: "Giữa kỳ", score: 9.7 },
    { name: "Thành phần", score: 9.7 },
    { name: "Cuối Kỳ", score: 9.7 },
  ];

const TableChart = ({ studentID,classID,subjectID }) => {
  return (
    <>
       <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                    <tr style={{ borderBottom: "2px solid #ddd" }}>
                        <th style={{ padding: "8px" }}>Cột điểm</th>
                        <th style={{ padding: "8px", textAlign: "center" }}>Điểm</th>

                    </tr>


            </thead>


            <tbody>

                        
                    {scores.map((item,index)=>{
                        return <>
                            <tr style={{ borderBottom: "1px solid #eee" }}>
                                <td  style={{ padding: "8px",textAlign: "center" }}> {item.name}</td>
                                <td style={{ padding: "8px", textAlign: "center" }}> {item.score}</td>
                            </tr>
                        </>

                    })}
                            
            </tbody>



       </table>
    
    </>
  );
};

export default TableChart;
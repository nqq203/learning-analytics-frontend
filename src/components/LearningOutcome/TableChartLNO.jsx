"use client";



const TableChart = ({ studentGrade }) => {
  console.log(studentGrade);
  const scores = [
    { name: "Điểm bài tập", score: studentGrade.assignmentQuizScore },
    { name: "Điểm đồ án", score: studentGrade.projectGrade },
    { name: "Điểm thực hành", score: studentGrade.practiceGrade },
    { name: "Điểm giữa kỳ", score: studentGrade.midtermGrade },
    { name: "Điểm cuối kỳ", score: studentGrade.finalGrade },
    { name: "Điểm cộng", score: studentGrade.bonus },
    { name: "Điểm tổng kết", score: studentGrade.totalGrade }
  ];
  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "8px", textAlign: "center" }}>Cột điểm</th>
            <th style={{ padding: "8px", textAlign: "center" }}>Điểm</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => {
            return <>
              <tr style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px", textAlign: "center" }}> {item.name || "--"}</td>
                <td style={{ padding: "8px", textAlign: "center" }}> {item.score === 0 ? 0 : !item.score ? "--" : item.score}</td>
              </tr>
            </>
          })}
        </tbody>
      </table>
    </>
  );
};

export default TableChart;
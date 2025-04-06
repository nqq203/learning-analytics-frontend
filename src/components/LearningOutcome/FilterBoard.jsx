import { useState } from "react";
import FilterItem from "./FilterItem.jsx";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
const FilterBoardContainer = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    border: 1px solid gray;
    border-radius:10px;
    padding:0.8rem;
    gap:1rem;
    background-color:var(--grey-200); 

`
const FilterBoardBtnGroupContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;

`

const FilterBoardAddConditionBtn = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    padding:0.5rem;
    font-size:1rem;
    background-color:transparent;
    border:none;
    border-radius:10px;
    font-weight:bold;
    cursor:pointer;

    &:hover{
    
        background-color:var(--grey-300);
    }
`

const FilterBoardBtnGroupSubContainer = styled.div`

    display:flex;
    flex-direction:row;
    gap:1rem;
`

const FilterBoarClearBtn = styled.div`
    padding:0.8rem;
    color:white;
    font-size:1rem;
    background-color:var(--warning-300);
    border:none;
    border-radius:10px;
    font-weight:bold;
    cursor:pointer;
    &:hover{
        background-color:var(--warning-400);
    }
    &:active{
    
        background-color:var(--warning-500);
    }

`
const FilterBoarApplyBtn = styled.div`
    padding:0.8rem;
    color:white;
    font-size:1rem;
    background-color:var(--success-300);
    border:none;
    border-radius:10px;
    font-weight:bold;

    &:hover{
        background-color:var(--success-400);
    }
    &:active{
    
        background-color:var(--success-500);
    }

`


export default function FilterBoard() {
    const [filters, setFilters] = useState([
        { id: Date.now(), math: "", field: "", value: [] }
    ]);

    // Hàm thêm một điều kiện mới
    const handleAddCondition = () => {
        setFilters([...filters, { id: Date.now(), math: "", field: "", value: [] }]);
    };

    // Hàm cập nhật filter khi có thay đổi từ FilterItem
    const handleFilterChange = (id, newFilter) => {
        setFilters((prevFilters) =>
            prevFilters.map((filter) => (filter.id === id ? { ...filter, ...newFilter } : filter))
        );
    };

    const handleClearFilter = (id) => {

        if(filters.length==1){
            setFilters([{ id: Date.now(), math: "", field: "", value: [] }])

        }
        else{
            setFilters((prevFilters) => prevFilters.filter((filter) => filter.id !== id));
        }
    };

    const handleApplyFilters = () => {
        const invalidFilter = filters.some(
            (filter) => filter.math === "" || filter.field === "" || filter.value.length === 0
        );

        if (invalidFilter) {
            alert("Có điều kiện bị trống! Vui lòng chọn đầy đủ Math, Field và Value.");
        } else {
            console.log("Applied Filters:", filters);
            alert("Bộ lọc đã được áp dụng! Kiểm tra console để xem kết quả.");
        }
    };
    return (
        <>
            <FilterBoardContainer>
                
                {filters.map((filter) => (
                    <FilterItem
                    key={filter.id}
                    category={"Class"}
                    onFilterChange={(newFilter) => handleFilterChange(filter.id, newFilter)}
                    onClearFilter={() => handleClearFilter(filter.id)}
                />
                ))}

                <FilterBoardBtnGroupContainer>
                    <FilterBoardAddConditionBtn onClick={handleAddCondition}> <MdAdd style={{ width: "35px", height: "30px",color:"var(--success-800)" }} /> Add Condition</FilterBoardAddConditionBtn>

                    <FilterBoardBtnGroupSubContainer>

                        <FilterBoarClearBtn onClick={() => { setFilters([{ id: Date.now(), math: "", field: "", value: [] }]) } }>
                            Clear Filters
                        </FilterBoarClearBtn>


                        <FilterBoarApplyBtn onClick={handleApplyFilters}>Apply Filters</FilterBoarApplyBtn>
                    </FilterBoardBtnGroupSubContainer>
                </FilterBoardBtnGroupContainer>

                
                {/* <div>
                    <h3>Selected Filters:</h3>
                    {filters.map((filter, index) => (
                        <div key={filter.id}>
                            <p>Condition {index + 1}:</p>
                            <p>Match: {filter.math}</p>
                            <p>Field: {filter.field}</p>
                            <p>Value: {filter.value.join(", ")}</p>
                        </div>
                    ))}
                </div> */}
            </FilterBoardContainer>
        </>
    );
}

import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoMdCloseCircleOutline } from "react-icons/io";
const FilterItemContainer = styled.div`
    
    display:flex;
    flex-direction:row;
    gap: 1rem;
    align-items:center;
    background-color:white;
    padding:1rem;
    border-radius:10px;

`;
const FilterItemButton = styled.div`
    padding:0.4rem;
    display:flex;
    flex-direction:row;
    background-color: var(--blue-500);
    color:white;
    font-weight:bold;
    gap:0.3rem;
    border-radius:10px;
    align-items:center;
    cursor:pointer;

`;

const FilterItemHeader = styled.div`
    font-size:1rem;
    font-weight:bold;


`

const FilterInput = styled.select`
    padding:0.5rem;
    font-size:1rem;
    text-align:left;

`

const FilterItemBtn = styled.button`
    padding:0.5rem;
    font-size:1rem;
    text-align:left;

`

const FilterItemClearBtn = styled.button`
    display:flex;
    align-items:center;
    padding:2px;
    background-color:transparent;
    border-radius:10px;
    border:1px solid gray;
    cursor:pointer;
    &:hover{
        background-color:var(--grey-200);
    }
    &:active{
    background-color:var(--grey-300);
    }
`


export default function FilterItem({ category, onFilterChange, onClearFilter }) {

    const [math, setMath] = useState("");
    const [field, setField] = useState("");
    const [value, setValue] = useState([]);


    const deleteValue = (item) => {
        setValue((prev) => {

            if (prev.includes(item)) {

                onFilterChange({ math, field, value: prev.filter((val) => val !== item) });
                return prev.filter((val) => val !== item);
            }
        }
        )

    }

    const fieldOption = (category_filter) => {

        const field_class = [
            {
                "value": "ClassName",
                "label": "Lớp"
            },
            {
                "value": "ClassOf",
                "label": "Khóa"
            },
            {
                "value": "Program",
                "label": "Chương trình"
            }
            ,
            {
                "value": "Falculity",
                "label": "Khoa"
            }
            ,
            {
                "value": "Specialized",
                "label": "Chuyên ngành"
            }
        ]


        const field_subject = [
            {
                "value": "ClassName",
                "label": "Lớp"
            }
        ]
        return category == "Class" ? field_class : field_subject

    }

    const handleChangeMath = (event) => {
        const newMath = event.target.value;
        setMath(event.target.value);
        onFilterChange({ math: newMath, field, value });
    }

    const handleChangeField = (event) => {
        const newField = event.target.value;
        setField(event.target.value);
        onFilterChange({ math, field: newField, value });

    }

    const handleChangeValue = (event) => {
        const selectedValue = event.target.value;

        setValue((prev) => {

            if (prev.includes(selectedValue)) {

                onFilterChange({ math, field, value: prev });
                return prev;
                //return prev.filter((val) => val !== selectedValue);
            }

            onFilterChange({ math, field, value: [...prev, selectedValue] });
            return [...prev, selectedValue];
        });



    }

    const ClearThisFilter = () => {
        onClearFilter();
    }

    return (
        <>
            <FilterItemContainer>

                <FilterItemHeader>
                    Match:
                </FilterItemHeader>
                <FilterInput value={math} onChange={handleChangeMath}>
                    <option value="" disable selected hidden>Chọn kiểu</option>
                    <option value="None">Không có</option>
                    <option value="Any">Bất Kỳ</option>
                    <option value="All">Tất cả</option>
                </FilterInput>

                <FilterInput value={field} onChange={handleChangeField}>
                    <option value="" disable selected hidden>Chọn trường</option>
                    {fieldOption(category).map((items, index) => (
                        <option key={index} value={items.value}>{items.label}</option>
                    ))}
                </FilterInput>


                {field != "" ?
                    <FilterInput onChange={handleChangeValue}>
                        <option value="" disable selected hidden>Chọn giá trị</option>
                        <option value="ClassName">ClassName</option>
                        <option value="ClassOf">ClassOf</option>
                        <option value="Program">Program</option>
                        <option value="Falculity">Falculity</option>
                        <option value="Specialized">Specialized</option>
                    </FilterInput>
                    : <></>
                }



                {value.map((item, index) => (

                    <FilterItemButton onClick={() => deleteValue(item)}>
                        {item}

                        <IoMdCloseCircleOutline id="FilterItemButtonDelete" style={{ width: "28px", height: "23px" }} />

                    </FilterItemButton>

                ))}

                <FilterItemClearBtn onClick={() => ClearThisFilter()}>
                    <IoMdCloseCircleOutline style={{ width: "35px", height: "30px" }} ></IoMdCloseCircleOutline>
                </FilterItemClearBtn>

            </FilterItemContainer>
        </>
    )
}
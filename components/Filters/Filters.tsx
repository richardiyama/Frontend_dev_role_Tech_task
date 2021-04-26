import React from 'react';
import { Filter } from '../../interfaces/filterInterface';
import styles from './Filters.module.scss';


type ListProps = {
    filters:Filter[],
    filterListTitle:string,
    filterName:string,
    multi:boolean
    cb:(V:any)=>void
    values:any[]
} 

type InputProps = {
    filter:Filter,
    filterName:string,
    index:number,
    multi:boolean,
    cb:(V:any)=>void,
    checked:boolean
} 

const Filters = ({ filters, filterListTitle, filterName, multi = false, cb, values }: ListProps) => {
    return (
        <div className={styles.filter}>
            <div className={styles.filter__title}>{filterListTitle}</div>
            {filters.map((filter: Filter, index: number) => {
                let found = values.find((value: any) => (JSON.stringify(value) === JSON.stringify(filter.value)));
                let checked = false;
                if (found) checked = true;
                return (
                    <div key={index}>
                        <FilterInput key={index} filter={filter} checked={checked} filterName={filterName} index={index} cb={cb} multi={multi} />
                    </div>
                )
            })}

        </div>
    )
}

const FilterInput = ({ filterName, index, cb, filter, multi, checked }: InputProps) => (
    <div className={styles.filter_input__container}>
        <input type={multi ? "checkbox" : "radio"} name={filterName}
            id={filterName + index}
            value={filter.value}
            checked={checked}
            onChange={() => cb(filter.value)}
        />
        <label htmlFor={filterName + index} className={styles.filter_input__label}>{filter.label}</label>
    </div>
)


export default Filters;
import React, { Fragment } from 'react';

const SelectComponent = ({label, value, options}, ref) => {
    return (
        <div className="form-group">
            {   label &&
                    <label>{label}</label>
            }
            <select
                defaultValue={value}
                ref={ref}
            >
                {   options.length > 0 ?
                        <Fragment>
                            {   options.map((items, index) => (
                                    <option value={items.value} key={items.value}>{items.text}</option>
                            ))}
                        </Fragment>
                    :
                        <option value="-1">Select the carpet units</option>
                }

            </select>
        </div>
    )
}

const Select = React.forwardRef(SelectComponent);
export default Select;
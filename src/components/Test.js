import React, { useEffect, useState } from "react";

const Filters = () => {
  const [filterData, setFilterData] = useState(null); // Stores data fetched from API
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedCaratRange, setSelectedCaratRange] = useState([]);
  

  const handleSelectShape = (shape) => {
    setSelectedShapes((prevSelected) =>
      prevSelected.includes(shape)
        ? prevSelected.filter((s) => s !== shape) // Deselect if selected
        : [...prevSelected, shape]                // Add if not selected
    );
  };

  // Shape data with image URLs
  const shapes = [
    { name: "Round", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/round.svg" },
    { name: "Oval", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/oval.svg" },
    { name: "Pear", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/pear.svg" },
    { name: "Marquise", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/marquiry.svg" },
    { name: "Heart", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/heart.svg" },
    { name: "Cushion", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/cushion-1.svg" },
    { name: "Emerald", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/emrald.svg" },
    { name: "Princess", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/princess.svg" },
    { name: "Radiant", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/radiant.svg" },
    { name: "Asscher", imgSrc: "https://office-locator.webbytemplate.com/app/uploads/sites/10/2024/05/asscher.svg" },
  ];


  // Fetch filter data from the API on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/filters/all-data");
        if (!response.ok) throw new Error("Failed to fetch filter data");
        
        const { data } = await response.json();
        setFilterData(data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilters();
  }, []);

  // Functions to handle selections for each filter type
  const handleSelect = (setState, value) => {
    setState((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filterSelection = {
      colors: selectedColors,
      shapes: selectedShapes,
      clarity: selectedClarity,
      caratRange: selectedCaratRange,
    };

   
    try {
      const response = await fetch("http://localhost:8000/api/apply-filters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterSelection),
      });
      if (!response.ok) throw new Error("Failed to apply filters");
      const result = await response.json();
      console.log("Filters applied:", result);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <div id="content" className="site-content" tabIndex="-1">
      <div className="rapnet-products rapnet-plugin rp-layout-1">
        <div className="custom-container">
          <div className="rapnet_filter_form">
            <form className="filter_form" onSubmit={handleSubmit}>

              {/* Color Filter */}
              {filterData?.color && (
                <div className="color filter_fields">
                  <h3 className="section-title">Color</h3>
                  <ul className="rap_data_select">
                    {filterData.color.map(color => (
                      <li
                        key={color}
                        className={`color_item ${selectedColors.includes(color) ? "selected" : ""}`}
                        onClick={() => handleSelect(setSelectedColors, color)}
                      >
                        {color}
                      </li>
                    ))}
                  </ul>
                </div>
              )}


            {/* Shape Filter */}

            <div className="shape filter_fields">
      <h3 className="section-title">Shape</h3>
      <div className="shape_input">
        {shapes.map((shape) => (
          <div key={shape.name} className="round_shape shapes_selection">
            <input
              id={shape.name}
              type="checkbox"
              value={shape.name}
              name="shapes"
              checked={selectedShapes.includes(shape.name)}
              onChange={() => handleSelectShape(shape.name)}
            />
            <label htmlFor={shape.name}>
              <span className="shapes-img">
                <img src={shape.imgSrc} alt={shape.name} />
              </span>
              <span className="shapes-title">{shape.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
           

              {/* Clarity Filter */}
              {filterData?.clarity && (
                <div className="clarity filter_fields">
                  <h3 className="section-title">Clarity</h3>
                  <ul className="rap_data_select">
                    {['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'SI3'].map(clarity => (
                      <li
                        key={clarity}
                        className={`clarity_item ${selectedClarity.includes(clarity) ? "selected" : ""}`}
                        onClick={() => handleSelect(setSelectedClarity, clarity)}
                      >
                        {clarity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Carat Range Filter */}
              {filterData?.caratRanges && (
                <div className="caratRange filter_fields">
                  <h3 className="section-title">Carat Range</h3>
                  <ul className="rap_data_select">
                    {['0.150 - 0.179', '0.300-0.349', '0.400-0.459', '0.500-0.589', '0.700-0.719', '0.900-0.959', '1.000-199', '2.000-2.499', 
                    '3.000-3.499', '5.000-5.499', '0.180-0.229', '0.350-0.379', '0.460-0.499', '0.590-0.649', '0.720-0.749', '0.960-0.999',
                    '1.200-1.499', '1.700-1.999', '2.500-2.999', '3.500-3.999', '5.500-5.999', '0.230-0.299', '0.380-0.399',
                    '0.650-0.699', '0.750-0.799', '4.000-4.499', '6.000-6.999', '0.230-0.299', '0.380-0.399', '0.650-0.699', 
                    '0.750-0.799', '4.500-4.999', '7.000-7.999', '8.000-9999'].map(caratRange => (
                      <li
                        key={caratRange}
                        className={`caratRange_item ${selectedCaratRange.includes(caratRange) ? "selected" : ""}`}
                        onClick={() => handleSelect(setSelectedCaratRange, caratRange)}
                      >
                        {caratRange}
                      </li>
                    ))}
                  </ul>
                </div>
              )}




              
              <div class="rapnet-extra-full">
  <div class="rapnet-extra-color">
    <div class="cut filter_fields">
      <h3 class="section-title">Cut</h3>
      <div id="cut_selection" class="cut_selection">
        <input type="hidden" name="cut_from" id="cut_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="cut_to" id="cut_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="cut" class="rap_data_select">
          <li class="cut_item" name="Excellent">Excellent</li>
          <li class="cut_item" name="Very Good">Very Good</li>
          <li class="cut_item" name="Good">Good</li>
          <li class="cut_item" name="Fair">Fair</li>
          <li class="cut_item" name="Poor">Poor</li>
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">Polish</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="Excellent">Excellent</li>
          <li class="polish_item" name="Very Good">Very Good</li>
          <li class="polish_item" name="Good">Good</li>
          <li class="polish_item" name="Fair">Fair</li>
          <li class="polish_item" name="Poor">Poor</li>
        </ul>
      </div>
    </div>

    <div class="symmetry filter_fields">
      <h3 class="section-title">Symmetry</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
          <li class="symmetry_item" name="Excellent">Excellent</li>
          <li class="symmetry_item" name="Very Good">Very Good</li>
          <li class="symmetry_item" name="Good">Good</li>
          <li class="symmetry_item" name="Fair">Fair</li>
          <li class="symmetry_item" name="Poor">Poor</li>
        </ul>
      </div>
    </div>
  </div>
</div>


<div class="rapnet-extra-color">
    <div class="fluorescence_intensities filter_fields">
      
    <h3 class="section-title">Fluorescence Intensities</h3>
    <div class="fluorescence_intensities_input">
      <div class="checkbox-list">
        <input id="very_slight" value="Very Slight" type="checkbox" name="fluorescence_intensities[]" />
        <label for="very_slight">Very Slight</label>
      </div>
      <div class="checkbox-list">
        <input id="faint" value="Faint" type="checkbox" name="fluorescence_intensities[]" />
        <label for="faint">Faint</label>
      </div>
      <div class="checkbox-list">
        <input id="medium2" value="Medium" type="checkbox" name="fluorescence_intensities[]" />
        <label for="medium2">Medium</label>
      </div>
      <div class="checkbox-list">
        <input id="slight" value="Slight" type="checkbox" name="fluorescence_intensities[]" />
        <label for="slight">Slight</label>
      </div>
      <div class="checkbox-list">
        <input id="strong" value="Strong" type="checkbox" name="fluorescence_intensities[]" />
        <label for="strong">Strong</label>
      </div>
      <div class="checkbox-list">
        <input id="very_strong" value="Very Strong" type="checkbox" name="fluorescence_intensities[]" />
        <label for="very_strong">Very Strong</label>
      </div>
      <div class="checkbox-list">
        <input id="none" value="None" type="checkbox" name="fluorescence_intensities[]" />
        <label for="none">None</label>
      </div>
    </div>
  </div>


    <div class="polish filter_fields">
      <h3 class="section-title">Milky</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="M0">M0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="M1">M1</li>
          <li class="polish_item" name="M2">M2</li>
          <li class="polish_item" name="M3">M3</li>
        </ul>
      </div>
    </div>

    <div class="labs filter_fields">
  <h3 class="section-title">Lab</h3>
  <div class="lab_input">
    <div class="checkbox-list">
      <input id="gia" value="GIA" type="checkbox" name="labs[]" />
      <label for="gia">GIA</label>
    </div>
    <div class="checkbox-list">
      <input id="igi" value="IGI" type="checkbox" name="labs[]" />
      <label for="igi">IGI</label>
    </div>
    <div class="checkbox-list">
      <input id="hrd" value="HRD" type="checkbox" name="labs[]" />
      <label for="hrd">HRD</label>
    </div>
    <div class="checkbox-list">
      <input id="labs_none" value="NONE" type="checkbox" name="labs[]" />
      <label for="labs_none">NONE</label>
    </div>
  </div>
</div>


<div class="table_percent filter_fields">
  <h3 class="section-title">Total Depth</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>

<div class="table_percent filter_fields">
  <h3 class="section-title">Table (%)</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>

<div class="table_percent filter_fields">
  <h3 class="section-title">Girdle</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>


<div class="table_percent filter_fields">
  <h3 class="section-title">Length</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>


<div class="table_percent filter_fields">
  <h3 class="section-title">Width</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>

<div class="table_percent filter_fields">
  <h3 class="section-title">Height</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>


<div class="table_percent filter_fields">
  <h3 class="section-title">Pavilion Angle </h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>


<div class="table_percent filter_fields">
  <h3 class="section-title">Crown Angle</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>

<div class="table_percent filter_fields">
</div>


<div class="polish filter_fields">
      <h3 class="section-title">Black Table</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="BT0">BT0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="BT1">BT1</li>
          <li class="polish_item" name="BT2">BT2</li>
          <li class="polish_item" name="BT3">BT3</li>
        </ul>
      </div>
    </div>
    
    <div class="polish filter_fields">
      <h3 class="section-title">Open Table</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="TO0">TO0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="TO1">TO1</li>
          <li class="polish_item" name="TO2">TO2</li>
          <li class="polish_item" name="TO3">TO3</li>
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">Black Crown</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="BC0">BC0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="BC1">BC1</li>
          <li class="polish_item" name="BC2">BC2</li>
          <li class="polish_item" name="BC">BC3</li>
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">White Table</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="WT0">WT0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="WT1">WT1</li>
          <li class="polish_item" name="WT2">WT2</li>
          <li class="polish_item" name="WT3">WT3</li>
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">Open Pavilion</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="PO0">PO0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="PO1">PO1</li>
          <li class="polish_item" name="PO2">PO2</li>
          <li class="polish_item" name="PO3">PO3</li>
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">White Crown</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
          <li class="polish_item" name="WC0">WC0</li>
          <li class="polish_item" name="NV">NV</li>
          <li class="polish_item" name="WC">WC1</li>
          <li class="polish_item" name="WC2">WC2</li>
          <li class="polish_item" name="WC3">WC3</li>
        </ul>
      </div>
    </div>


    <div class="table_percent filter_fields">
  <h3 class="section-title">Rap Dis</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>

<div class="table_percent filter_fields">
  <h3 class="section-title">Price/Carat</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>

<div class="table_percent filter_fields">
  <h3 class="section-title">Table Percent</h3>
  <div class="group-field">
    <div class="from_field">
      <label for="table_percent_from">From</label>
      <input name="table_percent_from" class="input-field" type="text" value="" id="table_percent_from" />
    </div>
    <div class="to_field">
      <label for="table_percent_to">To</label>
      <input name="table_percent_to" class="input-field" type="text" value="" id="table_percent_to" />
    </div>
  </div>
</div>



  </div>


              <button type="submit" className="btn btn-primary">Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from "react";
import Table from "./Table";

const Filters = () => {
  const [filterData, setFilterData] = useState(null); // Stores data fetched from API
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [selectedClarity, setSelectedClarity] = useState([]);
  const [selectedCaratRange, setSelectedCaratRange] = useState([]);
  const [selectedPolish, setSelectedPolish] = useState([]);
  const [selectedCut, setSelectedCut] = useState([]);
  const [selectedSymmetry, setSelectedSymmetry] = useState([]);
  const [blackTable, setBlackTable] = useState([]);
  const [openTable, setOpenTable] = useState([]);
  const [blackCrown, setBlackCrown] = useState([]);
  const [openPavilion, setOpenPavilion] = useState([]);
  const [whiteTable, setWhiteTable] = useState([]);
  const [whiteCrown, setWhiteCrown] = useState([]);
  const [keyToSymbol, setKeyToSymbol] = useState([]);
  const [fluorescenceIntensities, setFluorescenceIntensities] = useState([]);
  const [milky, setMilky] = useState("");
  const [labs, setLabs] = useState([]);
  const [totalDepthFrom, setTotalDepthFrom] = useState("");
  const [totalDepthTo, setTotalDepthTo] = useState("");
  const [tablePercentFrom, setTablePercentFrom] = useState("");
  const [tablePercentTo, setTablePercentTo] = useState("");
  const [girdleFrom, setGirdleFrom] = useState("");
  const [girdleTo, setGirdleTo] = useState("");
  const [lengthFrom, setLengthFrom] = useState("");
  const [lengthTo, setLengthTo] = useState("");
  const [widthFrom, setWidthFrom] = useState("");
  const [widthTo, setWidthTo] = useState("");
  const [heightFrom, setHeightFrom] = useState("");
  const [heightTo, setHeightTo] = useState("");
  const [pavilionAngleFrom, setPavilionAngleFrom] = useState("");
  const [pavilionAngleTo, setPavilionAngleTo] = useState("");
  const [crownAngleFrom, setCrownAngleFrom] = useState("");
  const [crownAngleTo, setCrownAngleTo] = useState("");
  const [result, setResult] = useState([]);
  const [showTable, setShowTable] = useState(false);
  
  // Range input fields state (example given for table percent, other filters to be added similarly)
  const [tablePercent, setTablePercent] = useState({ from: "", to: "" });

  const handleSelectShape = (shape) => {
    setSelectedShapes((prevSelected) =>
      prevSelected.includes(shape)
        ? prevSelected.filter((s) => s !== shape) // Deselect if selected
        : [...prevSelected, shape]                // Add if not selected
    );
  };


  const handleCheckboxChange = (event, setState, state) => {
    const value = event.target.value;
    setState(state.includes(value) ? state.filter(item => item !== value) : [...state, value]);
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
      'Color': selectedColors,
      'Shape': selectedShapes,
      'Clarity': selectedClarity,
      'Carat Range': selectedCaratRange,
      'Cut' : selectedCut,
      'Polish' : selectedPolish,
      'Symmetry' : selectedSymmetry,
      'Fluorescence Intensity' : '',
      'Lab' : '',
      'Milky' : '',
      'Open Table' : keyToSymbol

    };

    console.log("Filter Data to Submit:", filterSelection);

    try {
      const response = await fetch("http://localhost:8000/api/filters/to-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterSelection),
      });
      if (!response.ok) throw new Error("Failed to apply filters");
      const result = await response.json();
      setResult(result);
      setShowTable(true);
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
              {filterData?.Color && (
                <div className="color filter_fields">
                  <h3 className="section-title">Color</h3>
                  <ul className="rap_data_select">
                    {filterData.Color.map(color => (
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
 {filterData?.Clarity && (
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
              {true && (
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
        {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(cut => (
                      <li
                        key={cut}
                        className={`cut_item ${selectedCut.includes(cut) ? "selected" : ""}`}
                        onClick={() => handleSelect(setSelectedCut, cut)}
                      >
                        {cut}
                      </li>
                    ))}
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">Polish</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
        {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(polish => (
                      <li
                        key={polish}
                        className={`polish_item ${selectedPolish.includes(polish) ? "selected" : ""}`}
                        onClick={() => handleSelect(setSelectedPolish, polish)}
                      >
                        {polish}
                      </li>
                    ))}
        </ul>
      </div>
    </div>

    <div class="symmetry filter_fields">
      <h3 class="section-title">Symmetry</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
        {['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'].map(symm => (
                      <li
                        key={symm}
                        className={`symmetry_item ${selectedSymmetry.includes(symm) ? "selected" : ""}`}
                        onClick={() => handleSelect(setSelectedSymmetry, symm)}
                      >
                        {symm}
                      </li>
                    ))}
        </ul>
      </div>
    </div>
  </div>
</div>



<div className="rapnet-extra-color">
      {/* Fluorescence Intensities */}
      <div className="fluorescence_intensities filter_fields">
        <h3 className="section-title">Fluorescence Intensities</h3>
        <div className="fluorescence_intensities_input">
          {["Very Slight", "Faint", "Medium", "Slight", "Strong", "Very Strong", "None"].map((intensity) => (
            <div className="checkbox-list" key={intensity}>
              <input
                id={intensity.toLowerCase().replace(" ", "_")}
                value={intensity}
                type="checkbox"
                name="fluorescence_intensities[]"
                onChange={(e) => handleCheckboxChange(e, setFluorescenceIntensities, fluorescenceIntensities)}
                checked={fluorescenceIntensities.includes(intensity)}
              />
              <label htmlFor={intensity.toLowerCase().replace(" ", "_")}>{intensity}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Milky */}
      <div className="polish filter_fields">
        <h3 className="section-title">Milky</h3>
        <div id="polish_selection" className="polish_selection">
          <ul data_select_item="polish" className="rap_data_select">
            {["M0", "NV", "M1", "M2", "M3"].map((milkyOption) => (
              <li
                key={milkyOption}
                className={`polish_item ${milky === milkyOption ? "selected" : ""}`}
                onClick={() => setMilky(milkyOption)}
              >
                {milkyOption}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Labs */}
      <div className="labs filter_fields">
        <h3 className="section-title">Lab</h3>
        <div className="lab_input">
          {["GIA", "IGI", "HRD", "NONE"].map((lab) => (
            <div className="checkbox-list" key={lab}>
              <input
                id={lab.toLowerCase()}
                value={lab}
                type="checkbox"
                name="labs[]"
                onChange={(e) => handleCheckboxChange(e, setLabs, labs)}
                checked={labs.includes(lab)}
              />
              <label htmlFor={lab.toLowerCase()}>{lab}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Total Depth */}
      <div className="table_percent filter_fields">
        <h3 className="section-title">Total Depth</h3>
        <div className="group-field">
          <div className="from_field">
            <label htmlFor="total_depth_from">From</label>
            <input
              name="total_depth_from"
              className="input-field"
              type="text"
              value={totalDepthFrom}
              id="total_depth_from"
              onChange={(e) => setTotalDepthFrom(e.target.value)}
            />
          </div>
          <div className="to_field">
            <label htmlFor="total_depth_to">To</label>
            <input
              name="total_depth_to"
              className="input-field"
              type="text"
              value={totalDepthTo}
              id="total_depth_to"
              onChange={(e) => setTotalDepthTo(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table (%) */}
      <div className="table_percent filter_fields">
        <h3 className="section-title">Table (%)</h3>
        <div className="group-field">
          <div className="from_field">
            <label htmlFor="table_percent_from">From</label>
            <input
              name="table_percent_from"
              className="input-field"
              type="text"
              value={tablePercentFrom}
              id="table_percent_from"
              onChange={(e) => setTablePercentFrom(e.target.value)}
            />
          </div>
          <div className="to_field">
            <label htmlFor="table_percent_to">To</label>
            <input
              name="table_percent_to"
              className="input-field"
              type="text"
              value={tablePercentTo}
              id="table_percent_to"
              onChange={(e) => setTablePercentTo(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Additional Fields like Girdle, Length, Width, Height, Pavilion Angle */}
      {[
        { label: "Girdle", fromState: girdleFrom, toState: girdleTo, setFrom: setGirdleFrom, setTo: setGirdleTo },
        { label: "Length", fromState: lengthFrom, toState: lengthTo, setFrom: setLengthFrom, setTo: setLengthTo },
        { label: "Width", fromState: widthFrom, toState: widthTo, setFrom: setWidthFrom, setTo: setWidthTo },
        { label: "Height", fromState: heightFrom, toState: heightTo, setFrom: setHeightFrom, setTo: setHeightTo },
        {
          label: "Pavilion Angle",
          fromState: pavilionAngleFrom,
          toState: pavilionAngleTo,
          setFrom: setPavilionAngleFrom,
          setTo: setPavilionAngleTo,
        },
        {
          label: "Crown Angle",
          fromState: crownAngleFrom,
          toState: crownAngleTo,
          setFrom: setCrownAngleFrom,
          setTo: setCrownAngleTo,
        }
      ].map((field) => (
        <div className="table_percent filter_fields" key={field.label}>
          <h3 className="section-title">{field.label}</h3>
          <div className="group-field">
            <div className="from_field">
              <label htmlFor={`${field.label.toLowerCase()}_from`}>From</label>
              <input
                name={`${field.label.toLowerCase()}_from`}
                className="input-field"
                type="text"
                value={field.fromState}
                id={`${field.label.toLowerCase()}_from`}
                onChange={(e) => field.setFrom(e.target.value)}
              />
            </div>
            <div className="to_field">
              <label htmlFor={`${field.label.toLowerCase()}_to`}>To</label>
              <input
                name={`${field.label.toLowerCase()}_to`}
                className="input-field"
                type="text"
                value={field.toState}
                id={`${field.label.toLowerCase()}_to`}
                onChange={(e) => field.setTo(e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>


    <div class="table_percent filter_fields">
</div>





    

<div class="rapnet-extra-full">
  <div class="rapnet-extra-color">
    <div class="cut filter_fields">
      <h3 class="section-title">Black Table</h3>
      <div id="cut_selection" class="cut_selection">
        <input type="hidden" name="cut_from" id="cut_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="cut_to" id="cut_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="cut" class="rap_data_select">
        {['BT0', 'NV', 'BT1', 'BT2', 'BT3'].map(bt => (
                      <li
                        key={bt}
                        className={`cut_item ${blackTable.includes(bt) ? "selected" : ""}`}
                        onClick={() => handleSelect(setBlackTable, bt)}
                      >
                        {bt}
                      </li>
                    ))}
        </ul>
      </div>
    </div>

    <div class="polish filter_fields">
      <h3 class="section-title">Open Table</h3>
      <div id="polish_selection" class="polish_selection">
        <input type="hidden" name="polish_from" id="polish_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="polish_to" id="polish_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="polish" class="rap_data_select">
        {['OT0', 'NV', 'OT1', 'OT2', 'OT3'].map(ot => (
                      <li
                        key={ot}
                        className={`polish_item ${openTable.includes(ot) ? "selected" : ""}`}
                        onClick={() => handleSelect(setOpenTable, ot)}
                      >
                        {ot}
                      </li>
                    ))}
        </ul>
      </div>
    </div>

    <div class="symmetry filter_fields">
      <h3 class="section-title">Black Crown</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
        {['BC0', 'NV', 'BC1', 'BC2', 'BC3'].map(bc => (
                      <li
                        key={bc}
                        className={`symmetry_item ${blackCrown.includes(bc) ? "selected" : ""}`}
                        onClick={() => handleSelect(setBlackCrown, bc)}
                      >
                        {bc}
                      </li>
                    ))}
        </ul>
      </div>
    </div>


    <div class="symmetry filter_fields">
      <h3 class="section-title">White Table</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
        {['WT0', 'NV', 'WT1', 'WT2', 'WT3'].map(wt => (
                      <li
                        key={wt}
                        className={`symmetry_item ${whiteTable.includes(wt) ? "selected" : ""}`}
                        onClick={() => handleSelect(setWhiteTable, wt)}
                      >
                        {wt}
                      </li>
                    ))}
        </ul>
      </div>
    </div>
      
    <div class="symmetry filter_fields">
      <h3 class="section-title">Open Pavilion</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
        {['PO0', 'NV', 'PO1', 'PO2', 'PO3'].map(op => (
                      <li
                        key={op}
                        className={`symmetry_item ${openPavilion.includes(op) ? "selected" : ""}`}
                        onClick={() => handleSelect(setOpenPavilion, op)}
                      >
                        {op}
                      </li>
                    ))}
        </ul>
      </div>
    </div>



    <div class="symmetry filter_fields">
      <h3 class="section-title">White Crown</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
        {['WC0', 'NV', 'WC1', 'WC2', 'WC3'].map(wc => (
                      <li
                        key={wc}
                        className={`symmetry_item ${whiteCrown.includes(wc) ? "selected" : ""}`}
                        onClick={() => handleSelect(setWhiteCrown, wc)}
                      >
                        {wc}
                      </li>
                    ))}
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


<div class="table_percent filter_fields"></div>

<div class="symmetry filter_fields">
      <h3 class="section-title">Key To Symbol</h3>
      <div id="symmetry_selection" class="symmetry_selection">
        <input type="hidden" name="symmetry_from" id="symmetry_from" class="rap_filter_value_save_from" value=""/>
        <input type="hidden" name="symmetry_to" id="symmetry_to" class="rap_filter_value_save_to" value=""/>
        <ul data_select_item="symmetry" class="rap_data_select">
        {['Feather', 'Cavity', 'Minor Details To Polish', 'Pinpoint', 'Indented Natural', 'Cloud', 'Crystal', 'Needle', 'Surface Graining',
        'Extra Facet', 'Chip', 'Natural'].map(wc => (
                      <li
                        key={wc}
                        className={`symmetry_item ${keyToSymbol.includes(wc) ? "selected" : ""}`}
                        onClick={() => handleSelect(setKeyToSymbol, wc)}
                      >
                        {wc}
                      </li>
                    ))}
        </ul>
      </div>
      </div>


  </div>

  
</div>


              {/* Additional filter fields (repeat structure above) */}
              <button  type="submit" className="btn btn-primary">Search</button>
             {result && showTable&& <Table filters={result.data}/>} 
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;


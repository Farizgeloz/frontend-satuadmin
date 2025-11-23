import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../App.css';
import '../../styles/style_font.css';
import '../../styles/style_bg.css';
import '../../styles/style_button.css';
import '../../styles/style_design.css';
import NavSub from "../../NavSub"


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams,Link, NavLink } from "react-router-dom";
import {Row,Col} from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { FaPenToSquare,FaClipboardList } from "react-icons/fa6";
import Dropdown from 'react-bootstrap/Dropdown';
import { CSVLink, CSVDownload } from "react-csv";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MdDashboard,MdDataset,MdDetails} from "react-icons/md";

const DownloadTemplateDropdown = ({ dataku }) => {
  const today = new Date().toISOString().split("T")[0];
  const headers = [
    "koleksi_data",
    "title",
    "satker_id",
    "sektor_id",
    "location_id",
    "tahun_rilis",
    "tipe",
    "pengukuran",
    "periode",
    "deskripsi",
    "images",
    "visibilitas",
  ];

  // CSV
  const downloadTemplateCSV = () => {
    const rows = [
      headers,
      ...dataku.map(item => [
        item.koleksi_data || "",
        item.title || "",
        item.satker_id || "",
        item.sektor_id || "",
        item.location_id || "",
        item.tahun_rilis || "",
        item.tipe || "",
        item.pengukuran || "",
        item.periode || "",
        (item.deskripsi || "").replace(/\n/g, " "), // hapus enter biar CSV aman
        item.images || "",
        item.visibilitas || "",
      ])
    ];

    const csvContent = rows.map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${today}_map_location_maplist.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Excel
  const downloadTemplateExcel = async () => {
    const XLSX = await import("xlsx");
    const rows = [
      headers,
      ...dataku.map(item => [
        item.koleksi_data || "",
        item.title || "",
        item.satker_id || "",
        item.sektor_id || "",
        item.location_id || "",
        item.tahun_rilis || "",
        item.tipe || "",
        item.pengukuran || "",
        item.periode || "",
        (item.deskripsi || "").replace(/\n/g, " "),
        item.images || "",
        item.visibilitas || "",
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${today}_map_location_maplist.xlsx`);
  };

  return (
    <div className="col-span-3 max-[640px]:col-span-2 mt-0" style={{ zIndex: "999" }}>
      <Dropdown data-bs-theme="dark" className="m-2" style={{ zIndex: "999" }}>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Download Data
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item as="button" onClick={downloadTemplateExcel}>
            Download xlsx
          </Dropdown.Item>
          <Dropdown.Item as="button" onClick={downloadTemplateCSV}>
            Download CSV
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DownloadTemplateDropdown;

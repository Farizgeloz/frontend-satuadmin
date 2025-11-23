import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { MdDashboard, MdDataset, MdEditSquare } from "react-icons/md";
import { motion } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import NavSub from "../../NavSub";
import { Col, Container, Row } from "react-bootstrap";
import { api_url_satuadmin } from "../../../api/axiosConfig";





function Activity(kunci) {
  const [loading, setLoading] = useState(true);
  const [datasetku, setDatasetku] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rowsFiltered, setRowsFiltered] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      getIklanSearch();
    }, 1000);
  }, []);

  const getIklanSearch = async () => {
    const res = await api_url_satuadmin.get(`api/open-item/log`);
    const data = res.data.data || [];
    console.log("kunci : ", kunci);
    
    const filtered = data.filter(item =>
      item.jenis?.toLowerCase().includes(kunci.kunci.toLowerCase())
    );

    setDatasetku(filtered);
    setRowsFiltered(filtered);
    setLoading(false);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      setRowsFiltered(datasetku);
    } else {
      const filtered = datasetku.filter(
        (item) =>
          item.kategori?.toLowerCase().includes(value.toLowerCase()) ||
          item.item?.toLowerCase().includes(value.toLowerCase()) ||
          item.deskripsi?.toLowerCase().includes(value.toLowerCase())
      );
      setRowsFiltered(filtered);
    }
  };

  const rowsku = Array.isArray(rowsFiltered)
    ? rowsFiltered.map((row, index) => ({
        id: index + 1,
        no: index + 1,
        ...row
      }))
    : [];

  const columns = [
    { 
      field: "no", 
      headerName: "No", 
      width: 70,
      headerClassName: "custom-header", // kelas custom
    },
    { 
      field: "jenis", 
      headerName: "Jenis", 
      flex: 1,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.jenis}
            </p>
          </>
        );
      }  
    },
    { 
      field: "kategori", 
      headerName: "Kategori", 
      flex: 2,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.kategori}
            </p>
          </>
        );
      }  
    },
     { 
      field: "item", 
      headerName: "Item", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
              {row.item}
            </p>
          </>
        );
      }  
    },
    { 
      field: "deskripsi", 
      headerName: "Deskripsi", 
      flex: 3,  // 30%
      headerClassName: "custom-header", // kelas custom
      minWidth: 100,
      renderCell: (params) => {
        const row = params.row;
        return (
          <>
            <p className="textsize10">
               {row.deskripsi}
            </p>
          </>
        );
      }  
    },
    
    
  ];

  const filteredRows = rowsku.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

    // Format tanggal Indonesia aman
    function convertDate(datePicker) {
        if (!datePicker) return "-";
        const selectedDate = new Date(datePicker);
        if (isNaN(selectedDate)) return "-";

        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        const day = selectedDate.getDate();
        const monthName = monthNames[selectedDate.getMonth()];
        const year = selectedDate.getFullYear();
        const jam = String(selectedDate.getHours()).padStart(2, "0");
        const menit = String(selectedDate.getMinutes()).padStart(2, "0");
        const detik = String(selectedDate.getSeconds()).padStart(2, "0");

        return `${day} ${monthName} ${year} Waktu : ${jam}:${menit}:${detik} WIB`;
    }


  return (
    <div className="bg-slate-100 w-full max-h-screen sm:pt-0 max-[640px]:mt-12">
      

      <div className="drop-shadow-lg overflow-auto mb-9 p-2">
        <section className="py-3 rounded-lg bg-white px-2">

          <Container fluid>
            <Row className='portfoliolist'>
              <Col md={6}>
                <p className="text-gray-500 text-md">
                  Cari Riwayat (Log) Perubahan Data.
                </p>
                <div className="mb-3 w-100">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Cari data..."
                    className="border p-2 rounded w-100 input-gray textsize12"
                  />
                </div>
              </Col>
              <Col md={12}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  
                  {filteredRows.map((message) => (
                        
                    <div key={message.id} className="p-1">
                      <div className="card shadow-sm border-0 p-3 bg-light-subtle">
                        <dl className="row mb-0">
                          <dt className="col-sm-3 text-end text-secondary fw-semibold">Admin</dt>
                          <dd className="col-sm-9 text-dark">{message.nick_admin}</dd>

                          <dt className="col-sm-3 text-end text-secondary fw-semibold">Waktu</dt>
                          <dd className="col-sm-9 text-dark">{convertDate(message.updated_at)}</dd>

                          <dt className="col-sm-3 text-end text-secondary fw-semibold">Bagian</dt>
                          <dd className="col-sm-9 text-dark font_weight600">{message.jenis}</dd>

                          <dt className="col-sm-3 text-end text-secondary fw-semibold">Tindakan</dt>
                          <dd
                            className={`col-sm-9 fw-semibold ${
                              message.kategori?.toLowerCase().includes("delete")
                                ? "text-danger" // 🔴 merah
                                : message.kategori?.toLowerCase().includes("tambah") ||
                                  message.kategori?.toLowerCase().includes("create")
                                ? "text-success" // 🟢 hijau
                                : message.kategori?.toLowerCase().includes("update")
                                ? "text-primary" // 🔵 biru
                                : message.kategori?.toLowerCase().includes("balas")
                                ? "text-warning" // 🟡 kuning
                                : "text-dark" // ⚫ default hitam
                            }`}
                          >
                            {message.kategori}
                          </dd>


                          <dt className="col-sm-3 text-end text-secondary fw-semibold">Judul</dt>
                          <dd className="col-sm-9 text-dark font_weight600">{message.item}</dd>

                          <dt className="col-sm-3 text-end text-secondary fw-semibold">Deskripsi</dt>
                          <dd className="col-sm-9 text-muted">{message.deskripsi}</dd>
                        </dl>
                      </div>
                        
                    </div>


                ))}
                </motion.div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </div>
  );
}

export default Activity;

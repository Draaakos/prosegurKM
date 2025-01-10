const downloadExcel = (cars) => {
  return () => {
    const data = cars.map(car => [
      car.id,
      car.ppu,
      car.type,
      car.mileage,
      car.mileage_preventive_limit,
      car.mileage_preventive_notification,
      car.service,
      car.service_id,
      car.dayActive
    ]);

    const headers = [
      "ID", "PPU", "Type", "Mileage", "Mileage Preventive Limit",
      "Mileage Preventive Notification", "Service", "Service ID", "Day Active"
    ];

    data.unshift(headers);

    if (Array.isArray(data) && data.every(Array.isArray)) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

        XLSX.writeFile(wb, 'datos.xlsx');
    } else {
        console.error("Los datos no son un array de arrays válido.");
    }
  }
}

export default downloadExcel;

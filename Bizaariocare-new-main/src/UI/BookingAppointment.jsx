import React, { useMemo, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Booking Appointment Screen
 * - No external calendar lib, handcrafted for pixel-accurate UI
 * - Bootstrap responsive grid
 * - Select date -> loads slots for that date
 * - Select a row, then "Confirm Appointment" to simulate booking
 */
export default function BookingAppointment() {
  // ----- Calendar helpers -----
  const today = new Date();
  const [view, setView] = useState({ month: today.getMonth(), year: today.getFullYear() });
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const monthLabel = useMemo(() =>
    new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
      .format(new Date(view.year, view.month, 1)), [view]);

  // Build 1..31 grid for the current view month
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const firstWeekday = new Date(view.year, view.month, 1).getDay(); // 0 Sun ... 6 Sat
  const dayCells = Array(firstWeekday).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => new Date(view.year, view.month, i + 1))
  );
  while (dayCells.length % 7 !== 0) dayCells.push(null);

  // ----- Fake availability model -----
  // For demo: deterministic availability based on day number
  function getDateStatus(d) {
    if (!d) return 'blank';
    const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (d.getMonth() !== view.month || isPast) return 'disabled'; // grey
    const n = d.getDate();
    if ([14,20,25,29,30].includes(n)) return 'full'; // red
    if ([11,13,17,19,21,23,24].includes(n)) return 'available'; // green
    return 'neutral'; // light grey
  }

  // Slots per date
  const baseSlots = [
    { time: '08:30-09:00', client: 'Ravi Rai', phone: '+91 6595659259', fee: 2000, booked: true },
    { time: '08:30-09:00', client: '', phone: '', fee: 2000, booked: false },
    { time: '08:30-09:00', client: '', phone: '', fee: 2000, booked: false },
    { time: '08:30-09:00', client: '', phone: '', fee: 2000, booked: false },
    { time: '08:30-09:00', client: 'Gaurav Pandey', phone: '+91 6595659259', fee: 2000, booked: true },
    { time: '08:30-09:00', client: '', phone: '', fee: 2000, booked: false },
    { time: '08:30-09:00', client: '', phone: '', fee: 2000, booked: false },
    { time: '08:30-09:00', client: '', phone: '', fee: 2000, booked: false },
  ];

  const slotsForSelected = useMemo(() => {
    if (!selectedDate) return [];
    const status = getDateStatus(selectedDate);
    if (status === 'disabled' || status === 'blank' || status === 'neutral') return baseSlots.map(s => ({ ...s, booked: true }));
    if (status === 'full') return baseSlots.map(s => ({ ...s, booked: true }));
    // available
    return baseSlots;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate?.getTime(), view.month, view.year]);

  const [selectedRow, setSelectedRow] = useState(null);

  function prevMonth() {
    setView(v => {
      const m = v.month - 1; return { year: m < 0 ? v.year - 1 : v.year, month: (m + 12) % 12 };
    });
  }
  function nextMonth() {
    setView(v => {
      const m = v.month + 1; return { year: m > 11 ? v.year + 1 : v.year, month: m % 12 };
    });
  }

  function onConfirm() {
    if (selectedRow == null) return;
    const slot = slotsForSelected[selectedRow];
    const dstr = selectedDate.toLocaleDateString('en-GB');
    alert(`Appointment confirmed for ${dstr} at ${slot.time}.`);
  }

  const isSameDay = (a, b) => a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();

  return (
    <div className="container-fluid py-3" style={{fontFamily:'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial'}}>
      <div className="card border-0 shadow-sm rounded-4 p-2 p-md-4" style={{background:'#fff', borderRadius:24}}>
        {/* <h2 className="text-center fw-bold mb-4" style={{fontSize:36}}>Choose Date and Time</h2> */}

        <div className="row g-4 align-items-start">
          {/* Calendar */}
          <div className="col-12 col-lg-5">
            <div className="rounded-4 p-3 p-md-4 border" style={{borderColor:'#EFEFEF', borderWidth:1}}>
              {/* Header */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <button className="btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{width:36, height:36}} onClick={prevMonth} aria-label="Previous month">❮</button>
                <div className="fw-semibold" style={{fontSize:20}}>{monthLabel}</div>
                <button className="btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center" style={{width:36, height:36}} onClick={nextMonth} aria-label="Next month">❯</button>
              </div>

              {/* Weekday header */}
              <div className="d-grid" style={{gridTemplateColumns:'repeat(7, 1fr)', gap:12}}>
                {['Sun','Mon','Tue','Wed','Thur','Fri','Sat'].map(d=> (
                  <div key={d} className="text-center text-muted" style={{fontSize:14}}>{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="d-grid mt-2" style={{gridTemplateColumns:'repeat(7, 1fr)', gap:12}}>
                {dayCells.map((d, i)=>{
                  const status = getDateStatus(d);
                  const isSelected = d && isSameDay(d, selectedDate);
                  let bg = '#EDEDED', color = '#111', cursor='default', shadow='inset 0 0 0 1px #E5E5E5';
                  if (status==='blank') { return <div key={i}/>; }
                  if (status==='disabled') { bg='#F1F1F1'; color='#B9B9B9'; }
                  if (status==='neutral') { bg='#EDEDED'; color:'#8E8E8E'; cursor='pointer'; }
                  if (status==='available') { bg='#1DB954'; color:'#ffffff'; cursor='pointer'; shadow='none'; }
                  if (status==='full') { bg='#e11717'; color:'#ffffff'; cursor='not-allowed'; }
                  if (isSelected) { bg='#333333'; color:'#ffffff'; }

                  return (
                    <button
                      key={i}
                      className="border-0 rounded-circle fw-semibold"
                      style={{width:44, height:44, background:bg, color, boxShadow:shadow}}
                      disabled={status==='disabled' || status==='full'}
                      onClick={()=>{ if(status!=='disabled' && status!=='full'){ setSelectedDate(d); setSelectedRow(null);} }}
                    >
                      {d?.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="col-12 col-lg-7">
            <div className="table-responsive">
              <table className="table mb-0" style={{borderCollapse:'separate', borderSpacing:0}}>
                <thead>
                  <tr>
                    {['Time','Appointment/Client','Phone','Fees','Status'].map((h)=> (
                      <th key={h} className="border text-nowrap" style={{background:'transparent', borderColor:'#000000', padding:'14px 16px', fontWeight:600}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {slotsForSelected.map((s, idx)=> {
                    const isRowSelected = idx === selectedRow && !s.booked;
                    return (
                      <tr key={idx} className={isRowSelected ? 'table-active' : ''} style={{cursor: s.booked ? 'not-allowed' : 'pointer'}}
                          onClick={()=> !s.booked && setSelectedRow(idx)}>
                        <td className="border " style={{borderColor:'#000000', padding:'14px 16px'}}>08:30-09:00</td>
                        <td className="border " style={{borderColor:'#000000', padding:'14px 16px'}}>{s.client}</td>
                        <td className="border " style={{borderColor:'#000000', padding:'14px 16px'}}>{s.phone}</td>
                        <td className="border " style={{borderColor:'#000000', padding:'14px 16px'}}>${s.fee}</td>
                        <td className="border " style={{borderColor:'#000000', padding:'10px 16px'}}>
                          <span className="d-inline-flex align-items-center justify-content-center rounded" style={{width:26, height:26, background: s.booked ? '#FFEBEB' : '#E9F7EF', border:'1px solid', borderColor: s.booked ? '#E53935' : '#1DB954'}}>
                            {/* <span style={{fontSize:16}}>{s.booked ? <span></span> : '✅'}</span> */}
                            <div id="checkbox2" >
                                <input type="checkbox" />
                           </div>
                            
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-lg rounded-2 px-4" style={{background:'#FF7A00', color:'#fff'}} disabled={selectedRow==null} onClick={onConfirm}>
            Confirm Appointment
          </button>
        </div>
      </div>

      {/* Fine-tune edges to match screenshot */}
      <style jsx>{`
        .card { border-radius: 20px; }
        table thead th:first-child { border-top-left-radius: 8px; }
        table thead th:last-child { border-top-right-radius: 8px; }
      `}</style>
    </div>
  );
}

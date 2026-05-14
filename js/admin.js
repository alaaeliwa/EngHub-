// ═══════════════════════════════════════
// EngHub Admin Dashboard - Main Logic
// ═══════════════════════════════════════

// ── Sample Data ──
const usersData = [
  { id:1, name:"Alaa Eliwa", email:"alaa@eng.com", role:"admin", dept:"Software Engineering", status:"active" },
  { id:2, name:"Aya Ahmed", email:"aya@eng.com", role:"student", dept:"Software Engineering", status:"active" },
  { id:3, name:"Omar Khaled", email:"omar@eng.com", role:"student", dept:"Civil Engineering", status:"active" },
  { id:4, name:"Sara Mohsen", email:"sara@eng.com", role:"instructor", dept:"Electrical Engineering", status:"active" },
  { id:5, name:"Dr. Samy", email:"samy@eng.com", role:"instructor", dept:"Software Engineering", status:"active" },
  { id:6, name:"Youssef Ali", email:"youssef@eng.com", role:"student", dept:"Mechanical Engineering", status:"banned" },
  { id:7, name:"Nour Hassan", email:"nour@eng.com", role:"student", dept:"Civil Engineering", status:"active" },
  { id:8, name:"Mona Tamer", email:"mona@eng.com", role:"student", dept:"Electrical Engineering", status:"active" },
  { id:9, name:"Ahmed Fathy", email:"ahmed@eng.com", role:"instructor", dept:"Software Engineering", status:"active" },
  { id:10, name:"Layla Ibrahim", email:"layla@eng.com", role:"student", dept:"Software Engineering", status:"active" },
  { id:11, name:"Kareem Nabil", email:"kareem@eng.com", role:"student", dept:"Mechanical Engineering", status:"active" },
  { id:12, name:"Hana Saeed", email:"hana@eng.com", role:"student", dept:"Civil Engineering", status:"banned" },
];

const coursesData = [
  { id:1, title:"Advanced Java Patterns", instructor:"Dr. Samy", dept:"Software Engineering", students:145, rating:4.9, status:"approved" },
  { id:2, title:"Digital Circuit Design", instructor:"Eng. Sami", dept:"Electrical Engineering", students:98, rating:4.7, status:"approved" },
  { id:3, title:"Data Structures Mastery", instructor:"Ahmed Fathy", dept:"Software Engineering", students:210, rating:4.8, status:"approved" },
  { id:4, title:"Structural Analysis", instructor:"Dr. Hamed", dept:"Civil Engineering", students:76, rating:4.5, status:"pending" },
  { id:5, title:"Machine Learning Basics", instructor:"Sara Mohsen", dept:"Software Engineering", students:0, rating:0, status:"pending" },
  { id:6, title:"Thermodynamics II", instructor:"Dr. Waleed", dept:"Mechanical Engineering", students:54, rating:4.2, status:"approved" },
  { id:7, title:"Inappropriate Content", instructor:"Unknown", dept:"Other", students:0, rating:1.0, status:"rejected" },
];

const materialsData = [
  { id:1, title:"Data Structures Summary", type:"pdf", uploader:"Aya Ahmed", course:"Data Structures", date:"2h ago", status:"approved" },
  { id:2, title:"Network Protocols Intro", type:"video", uploader:"Dr. Samy", course:"Networking", date:"5h ago", status:"approved" },
  { id:3, title:"OS Notes Ch.5", type:"summary", uploader:"Omar Khaled", course:"Operating Systems", date:"Yesterday", status:"pending" },
  { id:4, title:"Circuit Diagrams Pack", type:"pdf", uploader:"Sara Mohsen", course:"Circuits", date:"2 days ago", status:"approved" },
  { id:5, title:"Useful Resources", type:"link", uploader:"Nour Hassan", course:"Civil Materials", date:"3 days ago", status:"pending" },
  { id:6, title:"Spam Content File", type:"pdf", uploader:"Youssef Ali", course:"N/A", date:"4 days ago", status:"rejected" },
];

const workshopsData = [
  { id:1, title:"UI/UX for Engineers", date:"May 15, 2026", location:"Online", registered:45, status:"approved" },
  { id:2, title:"Cloud Computing Workshop", date:"May 22, 2026", location:"Hall A", registered:30, status:"approved" },
  { id:3, title:"Git & GitHub Basics", date:"Jun 1, 2026", location:"Lab 3", registered:0, status:"pending" },
  { id:4, title:"Career in AI", date:"Jun 10, 2026", location:"Online", registered:80, status:"approved" },
  { id:5, title:"3D Printing Workshop", date:"Jun 15, 2026", location:"Workshop Lab", registered:12, status:"pending" },
];

const commentsData = [
  { id:1, user:"Youssef Ali", comment:"This course is trash!!!", on:"Advanced Java", date:"1h ago", reports:5 },
  { id:2, user:"Unknown User", comment:"Buy cheap stuff at spam-link.com", on:"Data Structures", date:"3h ago", reports:8 },
  { id:3, user:"Omar Khaled", comment:"Great content, very helpful!", on:"Circuit Design", date:"5h ago", reports:0 },
  { id:4, user:"Nour Hassan", comment:"Can someone share the solutions?", on:"OS Notes", date:"Yesterday", reports:1 },
  { id:5, user:"Hana Saeed", comment:"Offensive language removed...", on:"Networking", date:"2 days ago", reports:12 },
];

const departmentsData = [
  { id:1, name:"Software Engineering", students:420, courses:28, years:"4", subjects:45 },
  { id:2, name:"Civil Engineering", students:310, courses:22, years:"4", subjects:38 },
  { id:3, name:"Electrical Engineering", students:280, courses:18, years:"4", subjects:35 },
  { id:4, name:"Mechanical Engineering", students:238, courses:18, years:"4", subjects:32 },
];

// ── State ──
let editingUserId = null;
let deletingItem = { type: null, id: null };

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  setAdminDate();
  initTabs();
  initSidebar();
  renderOverview();
  renderUsers();
  renderCourses();
  renderMaterials();
  renderWorkshops();
  renderComments();
  renderDepartments();
  initSearch();
});

// ── Date ──
function setAdminDate() {
  const d = new Date();
  const el = document.getElementById('adminDate');
  if (el) el.innerHTML = `<i class="fa-solid fa-calendar"></i> ${d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}`;
}

// ── Tabs ──
function initTabs() {
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
  });
}

// ── Sidebar Mobile ──
function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const close = document.getElementById('sidebarClose');
  const sidebar = document.querySelector('.sidebar');
  if (toggle) toggle.addEventListener('click', () => sidebar.classList.toggle('active'));
  if (close) close.addEventListener('click', () => sidebar.classList.remove('active'));
}

// ── Toast ──
function showToast(msg, type = 'success') {
  const c = document.getElementById('toastContainer');
  const icons = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.animation = 'toastOut 0.4s forwards'; setTimeout(() => t.remove(), 400); }, 3000);
}

// ── Modal ──
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
// Make closeModal globally available
window.closeModal = closeModal;

// ═══ OVERVIEW ═══
function renderOverview() {
  // Activity Chart
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const values = [45,72,58,90,65,40,85];
  const max = Math.max(...values);
  const chart = document.getElementById('activityChart');
  if (chart) {
    chart.innerHTML = days.map((d,i) => `
      <div class="chart-bar-wrap" style="transition-delay: ${i * 0.1}s">
        <span class="chart-value">${values[i]}</span>
        <div class="chart-bar" style="height:${(values[i]/max)*180}px; background: linear-gradient(180deg, var(--primary) 0%, var(--primary-dark) 100%); border-radius: 8px 8px 4px 4px;"></div>
        <span class="chart-label">${d}</span>
      </div>
    `).join('');
  }

  // Department Chart
  const dChart = document.getElementById('deptChart');
  const deptColors = ['#0284c7','#16a34a','#f1822d','#db2777'];
  if (dChart) {
    dChart.innerHTML = departmentsData.map((d,i) => `
      <div class="chart-bar-wrap" style="transition-delay: ${i * 0.15}s">
        <span class="chart-value">${d.students}</span>
        <div class="chart-bar" style="height:${(d.students/420)*180}px; background: ${deptColors[i]}; border-radius: 8px 8px 4px 4px;"></div>
        <span class="chart-label">${d.name.split(' ')[0]}</span>
      </div>
    `).join('');
  }

  // Recent Activity
  const ra = document.getElementById('recentActivity');
  const activities = [
    { icon:'fa-user-plus', color:'#eff6ff', iconColor:'#2563eb', text:'New user registered', sub:'Kareem Nabil • 2m ago' },
    { icon:'fa-book-open', color:'#f0fdf4', iconColor:'#16a34a', text:'Course submitted for review', sub:'Machine Learning Basics • 15m ago' },
    { icon:'fa-flag', color:'#fff1f2', iconColor:'#e11d48', text:'Comment reported', sub:'Offensive content • 30m ago' },
    { icon:'fa-calendar-plus', color:'#fffbeb', iconColor:'#d97706', text:'Workshop created', sub:'Git & GitHub Basics • 1h ago' },
    { icon:'fa-cloud-arrow-up', color:'#f5f3ff', iconColor:'#7c3aed', text:'Material uploaded', sub:'OS Notes Ch.5 • 2h ago' },
  ];
  if (ra) {
    ra.innerHTML = activities.map(a => `
      <div class="recent-item animate-in">
        <div class="recent-icon" style="background:${a.color};color:${a.iconColor}"><i class="fa-solid ${a.icon}"></i></div>
        <div class="recent-info"><strong>${a.text}</strong><span>${a.sub}</span></div>
      </div>
    `).join('');
  }

  // Top Courses
  const tc = document.getElementById('topCourses');
  if (tc) {
    tc.innerHTML = coursesData.filter(c=>c.status==='approved').sort((a,b)=>b.students-a.students).slice(0,5).map((c,i) => `
      <div class="recent-item animate-in">
        <div class="recent-icon" style="background:${i===0?'#fffbeb':i===1?'#f8fafc':i===2?'#fff7ed':'#f1f5f9'};color:${i===0?'#d97706':i===1?'#64748b':i===2?'#c2410c':'#94a3b8'}">
          <i class="fa-solid ${i<3?'fa-trophy':'fa-book'}"></i>
        </div>
        <div class="recent-info"><strong>${c.title}</strong><span>${c.students} students • ⭐ ${c.rating}</span></div>
      </div>
    `).join('');
  }
}

// ═══ USERS TABLE ═══
function renderUsers(filter = {}) {
  let data = [...usersData];
  if (filter.role && filter.role !== 'all') data = data.filter(u => u.role === filter.role);
  if (filter.status && filter.status !== 'all') data = data.filter(u => u.status === filter.status);
  if (filter.search) data = data.filter(u => u.name.toLowerCase().includes(filter.search) || u.email.toLowerCase().includes(filter.search));

  const tbody = document.getElementById('usersBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(u => `
    <tr>
      <td>
        <div class="table-user">
          <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=${u.role==='admin'?'1e293b':u.role==='instructor'?'16a34a':'066f6c'}&color=fff&size=36" alt="${u.name}"/>
          <div class="table-user-info"><strong>${u.name}</strong><span>ID: ${u.id}</span></div>
        </div>
      </td>
      <td>${u.email}</td>
      <td><span class="badge badge-${u.role}">${capitalize(u.role)}</span></td>
      <td>${u.dept}</td>
      <td><span class="badge badge-${u.status}">${capitalize(u.status)}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" title="Edit" onclick="editUser(${u.id})"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn ban" title="${u.status==='banned'?'Unban':'Ban'}" onclick="toggleBan(${u.id})"><i class="fa-solid fa-${u.status==='banned'?'lock-open':'ban'}"></i></button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('user',${u.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ═══ COURSES TABLE ═══
function renderCourses(filter = {}) {
  let data = [...coursesData];
  if (filter.status && filter.status !== 'all') data = data.filter(c => c.status === filter.status);
  if (filter.search) data = data.filter(c => c.title.toLowerCase().includes(filter.search));

  const tbody = document.getElementById('coursesBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(c => `
    <tr>
      <td><strong style="color:var(--primary-dark)">${c.title}</strong></td>
      <td>${c.instructor}</td>
      <td>${c.dept}</td>
      <td>${c.students}</td>
      <td><span style="color:#f59e0b;font-weight:700">⭐ ${c.rating || '—'}</span></td>
      <td><span class="badge badge-${c.status}">${capitalize(c.status)}</span></td>
      <td>
        <div class="action-btns">
          ${c.status==='pending'?`<button class="action-btn approve" title="Approve" onclick="changeCourseStatus(${c.id},'approved')"><i class="fa-solid fa-check"></i></button>`:''}
          ${c.status==='pending'?`<button class="action-btn delete" title="Reject" onclick="changeCourseStatus(${c.id},'rejected')"><i class="fa-solid fa-xmark"></i></button>`:''}
          <button class="action-btn edit" title="Edit" onclick="showToast('Edit course modal coming soon','info')"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('course',${c.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ═══ MATERIALS TABLE ═══
function renderMaterials(filter = {}) {
  let data = [...materialsData];
  if (filter.type && filter.type !== 'all') data = data.filter(m => m.type === filter.type);
  if (filter.search) data = data.filter(m => m.title.toLowerCase().includes(filter.search));

  const typeIcons = { pdf:'fa-file-pdf', video:'fa-video', summary:'fa-file-lines', link:'fa-link' };
  const typeColors = { pdf:'#dc2626', video:'#0284c7', summary:'#16a34a', link:'#7c3aed' };

  const tbody = document.getElementById('materialsBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(m => `
    <tr>
      <td><strong style="color:var(--primary-dark)">${m.title}</strong></td>
      <td><i class="fa-solid ${typeIcons[m.type]}" style="color:${typeColors[m.type]};margin-right:0.4rem"></i>${capitalize(m.type)}</td>
      <td>${m.uploader}</td>
      <td>${m.course}</td>
      <td>${m.date}</td>
      <td><span class="badge badge-${m.status}">${capitalize(m.status)}</span></td>
      <td>
        <div class="action-btns">
          <button class="action-btn view" title="Preview" onclick="showToast('Preview feature coming soon','info')"><i class="fa-solid fa-eye"></i></button>
          ${m.status==='pending'?`<button class="action-btn approve" title="Approve" onclick="changeMaterialStatus(${m.id},'approved')"><i class="fa-solid fa-check"></i></button>`:''}
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('material',${m.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ═══ WORKSHOPS TABLE ═══
function renderWorkshops(filter = {}) {
  let data = [...workshopsData];
  if (filter.search) data = data.filter(w => w.title.toLowerCase().includes(filter.search));

  const tbody = document.getElementById('workshopsBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(w => `
    <tr>
      <td><strong style="color:var(--primary-dark)">${w.title}</strong></td>
      <td>${w.date}</td>
      <td>${w.location}</td>
      <td>${w.registered}</td>
      <td><span class="badge badge-${w.status}">${capitalize(w.status)}</span></td>
      <td>
        <div class="action-btns">
          ${w.status==='pending'?`<button class="action-btn approve" title="Approve" onclick="changeWorkshopStatus(${w.id},'approved')"><i class="fa-solid fa-check"></i></button>`:''}
          <button class="action-btn edit" title="Edit" onclick="showToast('Edit workshop feature coming soon','info')"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('workshop',${w.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ═══ COMMENTS TABLE ═══
function renderComments(filter = {}) {
  let data = [...commentsData];
  if (filter.type === 'reported') data = data.filter(c => c.reports > 0);
  if (filter.type === 'spam') data = data.filter(c => c.reports >= 5);

  const tbody = document.getElementById('commentsBody');
  if (!tbody) return;
  tbody.innerHTML = data.map(c => `
    <tr>
      <td><strong>${c.user}</strong></td>
      <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.comment}</td>
      <td>${c.on}</td>
      <td>${c.date}</td>
      <td>${c.reports > 0 ? `<span class="badge badge-${c.reports>=5?'banned':'pending'}">${c.reports} reports</span>` : '<span style="color:#94a3b8">None</span>'}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn delete" title="Delete Comment" onclick="deleteComment(${c.id})"><i class="fa-solid fa-trash"></i></button>
          ${c.reports>0?`<button class="action-btn ban" title="Ban User" onclick="showToast('User warned','info')"><i class="fa-solid fa-ban"></i></button>`:''}
        </div>
      </td>
    </tr>
  `).join('');
}

// ═══ DEPARTMENTS TABLE ═══
function renderDepartments() {
  const tbody = document.getElementById('departmentsBody');
  if (!tbody) return;
  tbody.innerHTML = departmentsData.map(d => `
    <tr>
      <td><strong style="color:var(--primary-dark)">${d.name}</strong></td>
      <td>${d.students}</td>
      <td>${d.courses}</td>
      <td>${d.years}</td>
      <td>${d.subjects}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" title="Edit" onclick="showToast('Edit department feature coming soon','info')"><i class="fa-solid fa-pen"></i></button>
          <button class="action-btn delete" title="Delete" onclick="confirmDelete('department',${d.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ═══ USER ACTIONS ═══
function editUser(id) {
  const u = usersData.find(u => u.id === id);
  if (!u) return;
  editingUserId = id;
  document.getElementById('editName').value = u.name;
  document.getElementById('editEmail').value = u.email;
  document.getElementById('editRole').value = u.role;
  document.getElementById('editStatus').value = u.status;
  openModal('editUserModal');
}

function saveUser() {
  const u = usersData.find(u => u.id === editingUserId);
  if (!u) return;
  u.name = document.getElementById('editName').value;
  u.email = document.getElementById('editEmail').value;
  u.role = document.getElementById('editRole').value;
  u.status = document.getElementById('editStatus').value;
  closeModal('editUserModal');
  renderUsers();
  showToast(`User "${u.name}" updated successfully`);
}
window.saveUser = saveUser;

function toggleBan(id) {
  const u = usersData.find(u => u.id === id);
  if (!u) return;
  u.status = u.status === 'banned' ? 'active' : 'banned';
  renderUsers();
  showToast(`User "${u.name}" ${u.status === 'banned' ? 'banned' : 'unbanned'}`, u.status === 'banned' ? 'error' : 'success');
}

// ═══ STATUS CHANGES ═══
function changeCourseStatus(id, status) {
  const c = coursesData.find(c => c.id === id);
  if (!c) return;
  c.status = status;
  renderCourses();
  showToast(`Course "${c.title}" ${status}`, status === 'approved' ? 'success' : 'error');
}

function changeMaterialStatus(id, status) {
  const m = materialsData.find(m => m.id === id);
  if (!m) return;
  m.status = status;
  renderMaterials();
  showToast(`Material "${m.title}" ${status}`);
}

function changeWorkshopStatus(id, status) {
  const w = workshopsData.find(w => w.id === id);
  if (!w) return;
  w.status = status;
  renderWorkshops();
  showToast(`Workshop "${w.title}" ${status}`);
}

// ═══ DELETE ═══
function confirmDelete(type, id) {
  deletingItem = { type, id };
  const names = {
    user: usersData.find(u=>u.id===id)?.name,
    course: coursesData.find(c=>c.id===id)?.title,
    material: materialsData.find(m=>m.id===id)?.title,
    workshop: workshopsData.find(w=>w.id===id)?.title,
    department: departmentsData.find(d=>d.id===id)?.name,
  };
  document.getElementById('deleteMsg').textContent = `Are you sure you want to delete "${names[type] || 'this item'}"? This action cannot be undone.`;
  openModal('deleteModal');
}

document.getElementById('confirmDeleteBtn')?.addEventListener('click', () => {
  const { type, id } = deletingItem;
  const arrays = { user: usersData, course: coursesData, material: materialsData, workshop: workshopsData, department: departmentsData };
  const arr = arrays[type];
  const idx = arr?.findIndex(i => i.id === id);
  if (idx > -1) arr.splice(idx, 1);

  closeModal('deleteModal');
  showToast(`${capitalize(type)} deleted successfully`, 'error');

  if (type === 'user') renderUsers();
  else if (type === 'course') renderCourses();
  else if (type === 'material') renderMaterials();
  else if (type === 'workshop') renderWorkshops();
  else if (type === 'department') renderDepartments();
});

function deleteComment(id) {
  const idx = commentsData.findIndex(c => c.id === id);
  if (idx > -1) commentsData.splice(idx, 1);
  renderComments();
  showToast('Comment deleted', 'error');
}

// ═══ SEARCH & FILTERS ═══
function initSearch() {
  // Users
  document.getElementById('searchUsers')?.addEventListener('input', e => {
    renderUsers({ search: e.target.value.toLowerCase(), role: document.getElementById('filterRole').value, status: document.getElementById('filterStatus').value });
  });
  document.getElementById('filterRole')?.addEventListener('change', e => {
    renderUsers({ role: e.target.value, status: document.getElementById('filterStatus').value, search: document.getElementById('searchUsers').value.toLowerCase() });
  });
  document.getElementById('filterStatus')?.addEventListener('change', e => {
    renderUsers({ status: e.target.value, role: document.getElementById('filterRole').value, search: document.getElementById('searchUsers').value.toLowerCase() });
  });

  // Courses
  document.getElementById('searchCourses')?.addEventListener('input', e => {
    renderCourses({ search: e.target.value.toLowerCase(), status: document.getElementById('filterCourseStatus').value });
  });
  document.getElementById('filterCourseStatus')?.addEventListener('change', e => {
    renderCourses({ status: e.target.value, search: document.getElementById('searchCourses').value.toLowerCase() });
  });

  // Materials
  document.getElementById('searchMaterials')?.addEventListener('input', e => {
    renderMaterials({ search: e.target.value.toLowerCase(), type: document.getElementById('filterMaterialType').value });
  });
  document.getElementById('filterMaterialType')?.addEventListener('change', e => {
    renderMaterials({ type: e.target.value, search: document.getElementById('searchMaterials').value.toLowerCase() });
  });

  // Workshops
  document.getElementById('searchWorkshops')?.addEventListener('input', e => {
    renderWorkshops({ search: e.target.value.toLowerCase() });
  });

  // Comments
  document.getElementById('filterCommentType')?.addEventListener('change', e => {
    renderComments({ type: e.target.value });
  });

  // Add Workshop button
  document.getElementById('addWorkshopBtn')?.addEventListener('click', () => {
    openModal('addWorkshopModal');
  });

  // Add Department button
  document.getElementById('addDeptBtn')?.addEventListener('click', () => {
    openModal('addDeptModal');
  });
}

// ═══ WORKSHOPS ACTIONS ═══
function saveWorkshop() {
  const titleInput = document.getElementById('newWorkshopTitle');
  const dateInput = document.getElementById('newWorkshopDate');
  const locationInput = document.getElementById('newWorkshopLocation');
  
  if (!titleInput.value.trim() || !dateInput.value || !locationInput.value.trim()) return;

  const d = new Date(dateInput.value);
  const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const newId = workshopsData.length ? Math.max(...workshopsData.map(w => w.id)) + 1 : 1;
  const newWorkshop = {
    id: newId,
    title: titleInput.value.trim(),
    date: formattedDate,
    location: locationInput.value.trim(),
    registered: 0,
    status: 'approved'
  };
  
  workshopsData.push(newWorkshop);
  renderWorkshops();
  closeModal('addWorkshopModal');
  showToast(`Workshop "${newWorkshop.title}" added successfully`);
  
  // Clear inputs
  titleInput.value = '';
  dateInput.value = '';
  locationInput.value = '';
}

// ═══ DEPARTMENTS ACTIONS ═══
function saveDepartment() {
  const nameInput = document.getElementById('newDeptName');
  const yearsInput = document.getElementById('newDeptYears');
  
  if (!nameInput.value.trim()) return;

  const newId = departmentsData.length ? Math.max(...departmentsData.map(d => d.id)) + 1 : 1;
  const newDept = {
    id: newId,
    name: nameInput.value.trim(),
    students: 0,
    courses: 0,
    years: yearsInput.value,
    subjects: 0
  };
  
  departmentsData.push(newDept);
  renderDepartments();
  closeModal('addDeptModal');
  showToast(`Department "${newDept.name}" added successfully`);
  
  // Clear inputs
  nameInput.value = '';
  yearsInput.value = '4';
}

// ═══ Utility ═══
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Make functions globally available for onclick handlers
window.editUser = editUser;
window.toggleBan = toggleBan;
window.confirmDelete = confirmDelete;
window.changeCourseStatus = changeCourseStatus;
window.changeMaterialStatus = changeMaterialStatus;
window.changeWorkshopStatus = changeWorkshopStatus;
window.deleteComment = deleteComment;
window.showToast = showToast;
window.saveDepartment = saveDepartment;
window.saveWorkshop = saveWorkshop;

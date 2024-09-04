class Student {
    constructor(id, code, name, gender, birthdate, hometown) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.birthdate = birthdate;
        this.hometown = hometown;
    }
}

class StudentManager {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    addStudent(student) {
        this.students.push(student);
        this.updateLocalStorage();
    }

    editStudent(updatedStudent) {
        this.students = this.students.map(student => 
            student.id === updatedStudent.id ? updatedStudent : student
        );
        this.updateLocalStorage();
    }

    deleteStudent(id) {
        this.students = this.students.filter(student => student.id !== id);
        this.updateLocalStorage();
    }

    getStudentById(id) {
        return this.students.find(student => student.id === id);
    }

    updateLocalStorage() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    displayStudents() {
        const studentList = document.getElementById('student-list');
        studentList.innerHTML = '';
        
        this.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.code}</td>
                <td>${student.name}</td>
                <td>${student.gender}</td>
                <td>${student.birthdate}</td>
                <td>${student.hometown}</td>
                <td>
                    <button class="edit" onclick="editStudent('${student.id}')">Sửa</button>
                    <button class="delete" onclick="deleteStudent('${student.id}')">Xóa</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }
}

const studentManager = new StudentManager();
studentManager.displayStudents();

document.getElementById('student-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('student-id').value || new Date().getTime().toString();
    const code = document.getElementById('student-code').value;
    const name = document.getElementById('student-name').value;
    const gender = document.getElementById('student-gender').value;
    const birthdate = document.getElementById('student-birthdate').value;
    const hometown = document.getElementById('student-hometown').value;

    const student = new Student(id, code, name, gender, birthdate, hometown);

    if (document.getElementById('student-id').value) {
        studentManager.editStudent(student);
    } else {
        studentManager.addStudent(student);
    }

    studentManager.displayStudents();
    this.reset();
});

function editStudent(id) {
    const student = studentManager.getStudentById(id);
    document.getElementById('student-id').value = student.id;
    document.getElementById('student-code').value = student.code;
    document.getElementById('student-name').value = student.name;
    document.getElementById('student-gender').value = student.gender;
    document.getElementById('student-birthdate').value = student.birthdate;
    document.getElementById('student-hometown').value = student.hometown;
}

function deleteStudent(id) {
    if (confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
        studentManager.deleteStudent(id);
        studentManager.displayStudents();
    }
}

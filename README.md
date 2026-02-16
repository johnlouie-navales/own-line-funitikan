# OWN-LINE FUNITIKAN
### Enhancing the Engagement of Grade 7 Faith in Filipino Fables Through Web-Based Interactive Approach

**OWN-LINE FUNITIKAN** is a web-based interactive application designed to help Grade 7 students engage with Filipino Fables through gamification. The application runs on a Local Area Network (LAN), allowing the teacher to act as the server while students connect using their devices.

## 🚀 Key Features

### 🎓 Student Interface
* **Interactive Fables:** Curated Filipino fables with embedded moral lessons.
* **Gamified Assessment:** Integrated Word Search (Hanap Salita) games for every story.
* **Countdown Timer:** Time-limited challenges to improve reading fluency and quick thinking.
* **Auto-Save Progress:** Game state, found words, and remaining time are saved automatically to the teacher's server.
* **Strict Validation:** Context-aware word validation (cannot select random letters).

### 👨‍🏫 Teacher/Admin Dashboard
* **Secure Login:** Dedicated login portal for teachers.
* **Real-Time Monitoring:** View all registered students and their current progress live.
* **Detailed Reports:** See exactly which stories a student has finished, their scores, and completion status.
* **Data Persistence:** All data is stored securely in the teacher's database.

## 🛠️ System Requirements

* **Teacher's Computer (Server):** Windows Laptop/PC with XAMPP installed.
* **Student Devices (Clients):** Any device with a web browser (Phone, Tablet, Laptop).
* **Network:** A Local Wi-Fi Router or Mobile Hotspot (Internet connection NOT required, just a local signal).

---

## 📦 Classroom Deployment Guide

### Phase 1: Teacher Setup ( The Server )
*Do this on the Teacher's Computer only.*

**1. Install XAMPP**
* Download and install **XAMPP** (Apache + MySQL) from [apachefriends.org](https://www.apachefriends.org/).
* Open the **XAMPP Control Panel**.
* Start **Apache** and **MySQL**.
* *Note: If a Windows Firewall popup appears, click "Allow Access".*

**2. Setup the Project Files**
* Go to your XAMPP installation folder (usually `C:\xampp\htdocs`).
* Create a folder named `own-line-funitikan`.
* Copy all project files into this folder.

**3. Setup the Database**
* Open a browser and go to `http://localhost/phpmyadmin`.
* Click **New** and create a database named: `own-line-funitikan`.
* Click the **Import** tab.
* Choose the file: `own-line-funitikan/database/own-line-funitikan.sql`.
* Click **Import** at the bottom.

**4. Find Your IP Address**
* Press `Windows Key + R`, type `cmd`, and press Enter.
* Type `ipconfig` and press Enter.
* Look for **IPv4 Address** (e.g., `192.168.1.5` or `192.168.0.10`).
* **Write this down.** This is the "Magic Number" students will need.

---

### Phase 2: Student Connection ( The Clients )
*Do this on Student Devices (Tablets/Phones/Laptops).*

**1. Connect to the Network**
* Ensure the student device is connected to the **SAME Wi-Fi** network as the Teacher's Computer.

**2. Open the Application**
* Open a web browser (Chrome, Safari, etc.).
* In the address bar, type the Teacher's IP Address followed by the project folder name.
* **Format:** `http://[TEACHER_IP]/own-line-funitikan/`
* **Example:** `http://192.168.1.5/own-line-funitikan/`

**3. Play!**
* The login screen should appear. Students can now enter their names and play.

---

### Phase 3: Teacher Monitoring

To view the dashboard, the teacher can access it on their own computer:
* **URL:** `http://localhost/own-line-funitikan/admin/`
* **Username:** `admin`
* **Password:** `admin123`

---

## ⚠️ Troubleshooting

**Students cannot connect?**
1. **Check Firewall:** On the Teacher's computer, search for "Firewall & Network Protection". Ensure XAMPP (Apache HTTP Server) is allowed through the firewall.
2. **Same Network:** Verify that the phone/tablet is not using Mobile Data, but is connected to the same Wi-Fi router as the Teacher.
3. **Correct IP:** IP addresses can change. Always check `ipconfig` before starting a class.

---

## 📝 Credits

**Research Team (BEED Students):**
* Michelle Vibares (Team Leader)
* JL Paulo
* Jon Jon Pardines
* Ma Andrea Mendez Padua
* Melody Remon Enriquez
* Rea Mae De Guia

**Technical Development:**
* Developed by: John Louie Navales

---
*Submitted in partial fulfillment of the requirements for the degree of Bachelor of Elementary Education.*
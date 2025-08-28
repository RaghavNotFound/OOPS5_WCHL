# VeriChain 🚀  
**Decentralized Skill Verification Platform on ICP Blockchain**

VeriChain is a fully decentralized platform built using **Next.js**, **Motoko**, and **Internet Computer Protocol (ICP)** that enables secure, tamper-proof, and transparent skill verification. It integrates **Internet Identity** for authentication and uses ICP smart contracts for data management.

---

## **Features**
✅ Fully decentralized skill verification  
✅ Built on **ICP Blockchain**  
✅ **Next.js** for fast and optimized frontend  
✅ **Motoko** backend with JSON data handling  
✅ Dynamic routing for challenges & profiles  
✅ Internet Identity authentication  
✅ Clean project structure with proper separation of frontend & backend  

---

## **Tech Stack**
| **Technology** | **Usage** |
|---------------|-----------|
| **Next.js** | Frontend framework |
| **Motoko** | Backend smart contracts |
| **ICP** | Blockchain deployment |
| **MOPS** | Motoko package manager |
| **Internet Identity** | Secure user login |
| **JSON** | Data storage |

---

## **Project Structure**
```
VeriChain/
├── frontend/           # All Next.js frontend code
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/            # Motoko backend code
│   ├── src/
│   │   └── main.mo
│   ├── canister_ids.json
│   ├── dfx.json
│   ├── mops.toml
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

---

## **Installation**
### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/verichain.git
cd verichain
```

### **2. Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### **3. Install Motoko Dependencies**
```bash
cd ../backend
mops install
```

### **4. Start Local ICP Environment**
```bash
dfx start --background
```

### **5. Deploy Canisters**
```bash
dfx deploy
```

### **6. Run the Frontend**
```bash
cd frontend
npm run dev
```

---

## **Login via Internet Identity**
We have integrated **Internet Identity** for secure login.  
Click **Login** in the navbar → Redirects to:  
[https://identity.internetcomputer.org/](https://identity.internetcomputer.org/)

---

## **.gitignore**
```
.dfx/
build/
node_modules/
dist/
.DS_Store
_MACOSX
.vscode/
target/
*.old.did
.idea
.mops
.env
```

---

## **Motoko Dependencies (mops.toml)**
```toml
# Motoko dependencies (https://mops.one/)

[dependencies]
base = "0.14.9"
map = "9.0.1"
```

---

## **License**
This project is licensed under the **MIT License**.

---

## **Contributors**
👨‍💻 **Raghav** – Developer & Maintainer  

---

## **Links**
🔗 [Internet Identity](https://identity.internetcomputer.org/)  
🔗 [MOPS Registry](https://mops.one)  
🔗 [ICP Documentation](https://internetcomputer.org/docs/current/home)

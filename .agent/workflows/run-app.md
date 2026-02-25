---
description: How to run both backend and frontend
---

To run the Kissan Sampurna application locally, follow these steps:

1. **Verify Dependencies**:
   - Ensure frontend dependencies are installed:
     ```bash
     npm install
     ```
   - Ensure backend dependencies are installed:
     ```bash
     pip install -r requirements.txt
     ```

// turbo
2. **Run Both Systems**:
   Run the following command in the root directory:
   ```bash
   npm run dev
   ```

   This command uses `concurrently` to start:
   - **Frontend**: Vite server on [http://localhost:5173](http://localhost:5173)
   - **Backend**: FastAPI (Uvicorn) on [http://127.0.0.1:8000](http://127.0.0.1:8000)

3. **Troubleshooting**:
   - If a port is already in use, you might see an error. Make sure to close any existing processes.
   - If the backend fails to find `backend.main:app`, ensure you are in the root directory `KissanSampurna`.

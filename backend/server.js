const express = require("express");
const mysql = require("mysql");
const cors = require('cors');

const app = express();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const bodyParser = require("body-parser");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");



app.use(express.json());

app.use(cors(
    {
        origin: ['http://localhost:5173'],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession(
    {
        key: "userId",
        secret: "globivista",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24
        }

    }
))












const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'globivistav1'
})

app.get("/", (req, res) => {
    res.json("Hello, Backend!");
})


app.post("/login", (req, res) => {
    const loginQuery = "SELECT * FROM users WHERE username = ? AND password = ?";
    const values = [req.body.username, req.body.password]; // Define values array here

    db.query(loginQuery, values, (err, data) => { // Pass values array as the second argument
        if (err) {
            console.error("Error during login:", err.message);
            return res.status(500).json({ error: "Login Failed!" });
        } else {
            if (data.length > 0) {
                req.session.user = data;
                console.log(req.session.user);
                // Login successful
                return res.json({ message: "Login successful", user: data[0] });
            } else {
                // Username or password incorrect
                return res.status(401).json({ error: "Invalid username or password" });
            }
        }
    });
});


app.get("/login", (req, res) =>
{
    if(req.session.user)
    {
        res.send(
            {
                loggedIn: true,
                user: req.session.user
            }
        )
    }
    else
    {
        res.send(
            {
                loggedIn: false
            }
        ) 
    }
})













app.get("/data", (req, res) => {
    const superadminQuery = "SELECT * FROM users";
    db.query(superadminQuery, (err, data) => {
        if(err) {
            return res.json("Error!");
        } else {
            return res.json(data);  
        }
    });
});

app.get("/customer_applications", (req, res) => {
    const customerAppQuery = "SELECT * FROM customer_applications";
    db.query(customerAppQuery, (err, data) => {
        if (err) {
            return res.json("Error!");
        } else {
            return res.json(data);
        }
    });
});

app.get("/organisation", (req, res) => {
    const organisationsQuery = "SELECT * FROM organisation";
    db.query(organisationsQuery, (err, data) => {
        if(err) {
            return res.status(500).json({ error: "Error fetching organisations" });
        } else {
            return res.json(data);  
        }
    });
});

app.get("/loanProductType", (req, res) => {
    const loanProductTypeQuery = "SELECT * FROM loanProductType";
    db.query(loanProductTypeQuery, (err, data) => {
        if(err) {
            return res.status(500).json({ error: "Error fetching loan product type" });
        } else {
            return res.json(data);  
        }
    });
});

app.get("/loanType", (req, res) => {
    const loanTypeQuery = "SELECT * FROM loanType";
    db.query(loanTypeQuery, (err, data) => {
        if(err) {
            return res.status(500).json({ error: "Error fetching loan type" });
        } else {
            return res.json(data);  
        }
    });
});



app.post("/add_customer", (req, res) => {
    const { firstName, lastName, email, pan, loanAmount, loanProductType, organisationName } = req.body;

    // Assuming you have validation logic here, if not, you should validate user input

    const InsertQuery = "INSERT INTO customer_applications (first_name, last_name, email, pan, loan_amount, loan_product_type, organisation_name) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [firstName, lastName, email, pan, loanAmount, loanProductType, organisationName];

    db.query(InsertQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting customer data:", err.message); // Log the specific error message
            return res.status(500).json({ error: "Error adding customer" });
        } else {
            console.log("Customer added successfully");
            return res.status(200).json({ message: "Customer added successfully" });
        }
    });
});



app.put("/update_customer/:id", (req, res) => 

{
    const customerId = req.params.id;
    const { firstName, lastName, email, pan, loanAmount, loanType, loanProductType, organisationName } = req.body;

    console.log("Received First Name:", firstName);
    console.log("Received Last Name:", lastName);
    console.log("Received Email:",email);
    console.log("Received PAN Number:", pan);
    console.log("Received Loan Amount:", loanAmount);
    console.log("Received Loan Product Type:", loanProductType);
    console.log("Received Loan Type:", loanType);
    console.log("Received Organisation Name:", organisationName);



    const updateFields = {};
    if (firstName) updateFields.first_name = firstName;
    if (lastName) updateFields.last_name = lastName;
    if (email) updateFields.email = email;
    if (pan) updateFields.pan = pan;
    if (loanAmount) updateFields.loan_amount = loanAmount;
    if (loanType) updateFields.loan_type = loanType;
    if (loanProductType) updateFields.loan_product_type = loanProductType;
    if (organisationName) updateFields.organisation_name = organisationName;

    const updateQuery = `
        UPDATE customer_applications
        SET ?
        WHERE id = ?`;

    db.query(updateQuery, [updateFields, customerId], (err, result) => {
        if (err) {
            console.error("Error updating customer data:", err.message);
            return res.status(500).json({ error: "Error updating customer" });
        } else {
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Customer not found" });
            }
            console.log("Customer updated successfully");
            return res.status(200).json({ message: "Customer updated successfully" });
        }
    });
});



app.get("/customer_applications/:id", (req, res) => {
    const customerId = req.params.id; // Get the customer ID from the request parameters
    const customerQuery = "SELECT * FROM customer_applications WHERE id = ?";
    db.query(customerQuery, [customerId], (err, data) => {
        if (err) {
            console.error("Error fetching customer:", err);
            return res.status(500).json({ error: "Error fetching customer" });
        } else {
            if (data.length === 0) {
                return res.status(404).json({ error: "Customer not found" });
            } else {
                return res.json(data[0]); // Assuming only one customer will be found
            }
        }
    });
});




app.post("/add_user", (req, res) => {
    const { firstName, lastName, email, companyID, role, username, password, organisationName } = req.body;

    // Assuming you have validation logic here, if not, you should validate user input

    const InsertQuery = "INSERT INTO users (first_name, last_name, email, company_id, role, username, password, organisation_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [firstName, lastName, email, companyID, role, username, password, organisationName];

    db.query(InsertQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting user data:", err.message); // Log the specific error message
            return res.status(500).json({ error: "Error adding user" });
        } else {
            console.log("User added successfully");
            return res.status(200).json({ message: "User added successfully" });
        }
    });
});







app.get("/roles", (req, res) => {
    const rolesQuery = "SELECT * FROM roles";
    db.query(rolesQuery, (err, data) => {
        if(err) {
            return res.status(500).json({ error: "Error fetching roles" });
        } else {
            return res.json(data);  
        }
    });
});








app.post("/data", (req, res) =>
{
    const InsertQuery = "INSERT INTO superadmins (`username`, `password`) VALUES (?)";
    // const values = ["superadmin2", "12345678"];
    const values = [
        req.body.username,
        req.body.password,
    ]

    db.query(InsertQuery, [values], (err, values) =>
    {
        if(err)
        {
            return res.json("Error!");
        }
        else
        {
            return res.json("Book has been created successfully!");
        }
    })
})


app.listen(8080, () =>
{
    console.log("Running");
})

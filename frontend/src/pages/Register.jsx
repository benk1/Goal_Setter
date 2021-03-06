import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	const { name, email, password, password2 } = formData;

	const handleChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<section className="heading">
				<h1>
					<FaUser /> Register
				</h1>
				<p>Please create an account</p>
			</section>

			<section className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={name}
							placeholder="Enter your name"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<input
							type="text"
							className="form-control"
							id="password2"
							name="password2"
							value={password2}
							placeholder="Enter your password2"
							onChange={handleChange}
						/>
					</div>

					<div className="form-group">
						<button type="submit" className="btn btn-block">
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;

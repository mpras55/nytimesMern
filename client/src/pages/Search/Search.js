import React, { Component } from "react";
import DeleteBtn from "./../../components/DeleteBtn";
import SaveBtn from "./../../components/SaveBtn";
import Minitron from "./../../components/Minitron";
import API from "../../utils/API";
import { Col, Row, Container } from "./../../components/Grid";
import { List, ListItem } from "./../../components/List";
import { List2, List2Item } from "./../../components/List2";
import { Input, FormBtn } from "./../../components/Form";

class Search extends Component {
	state = {
		news: [],
		saved: [],
		topic: "",
		startYear: "",
		endYear: ""
	};

	componentDidMount() {
		this.loadSavedNews();
	}

	loadSavedNews = () => {
		API.getSavedNews()
			.then(res =>
				this.setState({ saved: res.data })
			)
			.catch(err => console.log(err));
	};

	saveNews = (topic, url, pubdate) => {
		// console.log(topic, url, pubdate);
		API.savenews({
			topic: topic,
			url: url,
			pubDate: pubdate
		})
			.then(res => this.loadSavedNews())
			.catch(err => console.log(err));
	};

	deleteNews = (id) => {
		// console.log(id, "Executing Delete News");
		API.deleteSavedNews(id)
			.then(res => this.loadSavedNews())
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};


	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.topic && this.state.startYear && this.state.endYear) {
			let startDate = this.state.startYear + "0101";
			let endDate = this.state.endYear + "1231";

			API.getNews(
				this.state.topic, startDate, endDate)
				.then(res =>
					// console.log(res.data.response.docs)
					this.setState({ news: res.data.response.docs, topic: "", startYear: "", endYear: "" })
				)
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="xl-4 lg-6 md-6 sm-12">
						<Minitron>
							<h1>Search</h1>
						</Minitron>
						<form>
							<Input
								value={this.state.topic}
								onChange={this.handleInputChange}
								name="topic"
								placeholder="Topic (required)"
							/>
							<Input
								value={this.state.startYear}
								onChange={this.handleInputChange}
								name="startYear"
								placeholder="Start Year - YYYY (required)"
							/>
							<Input
								value={this.state.endYear}
								onChange={this.handleInputChange}
								name="endYear"
								placeholder="End Year - YYYY (required)"
							/>
							<FormBtn
								disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
								onClick={this.handleFormSubmit}
							>
								Search
							</FormBtn>
						</form>
					</Col>
					<Col size="xl-4 lg-6 md-6 sm-12">
						<Minitron>
							<h1>Top 10 Results</h1>
						</Minitron>
						{this.state.news.length ? (
							<List>
								{this.state.news.map(news1 => (
									<ListItem key={news1.web_url} topic={news1.headline.main} pubdate={news1.pub_date}>
										<a href={news1.web_url} target="_blank">
											<strong>
												{news1.headline.main}
											</strong>
											<br />
											Published: {news1.pub_date}
										</a>
										<SaveBtn onClick={() => this.saveNews(news1.headline.main, news1.web_url, news1.pub_date)} />
									</ListItem>
								))}
							</List>
						) : (
								<h3>No Results to Display</h3>
							)}
					</Col>
					<Col size="xl-4 lg-12 md-12 sm-12">
						<Minitron>
							<h1>Saved Articles</h1>
						</Minitron>
						{this.state.saved.length ? (
							// <h3> {this.state.saved} </h3>
							<List2>
								{this.state.saved.map(save => (
									<List2Item key={save.__id} topic={save.topic} pubdate={save.pubDate}>
										<a href={save.url} target="_blank">
											<strong>
												{save.topic}
											</strong>
											<br />
											Published: {save.pubDate}
										</a>
										<DeleteBtn onClick={() => this.deleteNews(save._id)} />
									</List2Item>
								))}
							</List2>
						) : (
								<h3>No Results to Display</h3>
							)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Search;

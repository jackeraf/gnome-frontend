# Description of features implemented:

From the thousands of records/gnomes received from the api call I have sliced them to show only 14 records on a table.

The columns chosen to show on screen are: ID, Name and Thumbnail.
You can: search a gnome by name, clean the search to display the full list of gnomes again and click each gnome to view more details of it.

### The structure of folders are the following:

Src:

```sh
	components: stateless components here.
```
-	GnomeItem: with Id, name and thumbnail. They'll display on each table row.
-	Routes: 2 routes of the app: list and detail.
-	Notification: toast to be displayed on fetch error.
```sh
	 Containers: components connected to redux that get their state and dispatch actions to change the app state.
```

-	GnomeDetail: displays more details of the selected gnome
-	GnomeList: displays 14 gnomes on the table from the api call.
```sh
	 Mock: data from api call mocked.
```
```sh
	 Service: the axios call to the api.
```
```sh
	Store: it has the action creators, their types of actions (constants) and the reducer file with its unit tests.
```

```sh
	Utils folder: it has a storeUtil that is passed as props on unit tests and an updaterState file which returns the redux state updated.
```
### To run the app
```sh
$ npm install
$ npm start
```
### To run the unit tests
```sh
$ npm test
```

I have implemented unit tests on reducers instead of action creators because are the sync ones that test the final changes.

Then I’ve implemented unit tests on GnomeList container and GnomeDetail container too.
On containers I mocked the props and the action creators to see whether they’re called or not because as a convention when testing containers there’s no need to test the results from the action creators only see if they’ve been called instead.

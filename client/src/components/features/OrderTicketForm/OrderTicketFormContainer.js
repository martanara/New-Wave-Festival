import { connect } from 'react-redux';
import { getSeats, addSeatRequest, getRequests, loadSeatsRequest } from '../../../redux/seatsRedux';
import OrderTicketForm from './OrderTicketForm';

const mapStateToProps = state => ({
  requests: getRequests(state),
  seats: getSeats(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  addSeat: (seat) => dispatch(addSeatRequest(seat)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTicketForm);
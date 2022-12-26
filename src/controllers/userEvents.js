import { UserEvent } from '../database/models/index.js';
import { getPagination } from '../helpers/util.js';

export async function create(req, res) {
  if (!req.body.title) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const id = req.params.id;
  const userEventProps = { ...req.body, user: id };
  const userEvent = new UserEvent(userEventProps);

  try {
    const createdUserEvent = await userEvent.save();

    res.status(201).json({ userEvent: createdUserEvent });
  } catch(err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the UserEvent.'
    });
  }
};

export async function findAllUserEvents(req, res) {
  const id = req.params.id;
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  const myCustomLabels = {
    docs: 'userEvents',
    page: 'currentPage'
  };

  const options = {
    offset, 
    limit, 
    customLabels: myCustomLabels,
  }

  try {
    const data = await UserEvent.paginate({ user: id }, options);

    res.status(201).send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while retrieving userEvents.'
    });
  }
};

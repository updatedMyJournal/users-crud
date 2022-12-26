import { User } from '../database/models/index.js';
import { getPagination } from '../helpers/util.js';

export async function create(req, res) {
  if (!req.body.firstName && !req.body.lastName) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  const user = new User(req.body);

  try {
    const createdUser = await user.save();

    res.status(201).json({ user: createdUser });
  } catch(err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the User.'
    });
  }
};

export async function findAll(req, res) {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  const myCustomLabels = {
    docs: 'users',
    page: 'currentPage'
  };

  const options = {
    offset, 
    limit, 
    populate: ['eventsCount', 'events'],
    customLabels: myCustomLabels,
  }

  try {
    const data = await User.paginate({}, options);

    res.status(201).send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while retrieving users.'
    });
  }
};

export async function findOne(req, res) {
  const id = req.params.id;

  try {
    const user = await User.findById(id).populate(['eventsCount', 'events']);

    res.status(200).json({ user });
  } catch(err) {
    res
      .status(500)
      .send({ message: `Error retrieving the User with id=${id}` });
  }
};

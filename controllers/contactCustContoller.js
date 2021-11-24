const { contactCustomer } = require('../models');
const Joi = require('joi');

module.exports = {
    createData: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                email: Joi.string().required(),
                company: Joi.string().required(),
                message: Joi.string().required(),
            });

            const check = schema.validate(
                {
                    email: body.email,
                    company: body.company,
                    message: body.message,
                },
                { abortEarly: false }
            );

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            const customerEmail = await contactCustomer.findOne({
                where: {
                    email: body.email,
                },
            });

            if (customerEmail) {
                return res.status(400).json({
                    status: 'failed',
                    message:
                        'This email has been used for give our company message, use another email',
                });
            }

            const dataCustomer = await contactCustomer.create({
                email: body.email,
                company: body.company,
                message: body.message,
            });

            return res.status(200).json({
                status: 'success',
                message: 'Your feedback has been send',
                data: dataCustomer,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    getAllData: async (req, res) => {
        try {
            const customerData = await contactCustomer.findAll();

            if (!customerData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Data retrieved success',
                data: customerData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    getOneData: async (req, res) => {
        try {
            const customerData = await contactCustomer.findOne({
                where: { id: req.params.id },
            });

            if (!customerData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            return res.status(200).json({
                status: 'success',
                message: 'Data retrieved success',
                data: customerData,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    updateData: async (req, res) => {
        const body = req.body;

        try {
            const schema = Joi.object({
                email: Joi.string(),
                company: Joi.string(),
                message: Joi.string(),
            });

            const check = schema.validate(
                {
                    email: body.email,
                    company: body.company,
                    message: body.message,
                },
                { abortEarly: false }
            );

            const checkDataCust = await contactCustomer.findOne({
                where: { id: req.params.id },
            });

            if (!checkDataCust) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            if (check.error) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'bad request',
                    errors: check.error['details'].map(
                        ({ message }) => message
                    ),
                });
            }

            if (body.email) {
                const customerEmail = await contactCustomer.findOne({
                    where: {
                        email: body.email,
                    },
                });

                if (customerEmail) {
                    return res.status(400).json({
                        status: 'failed',
                        message:
                            'This email already use, use another email for change email',
                    });
                }
            }

            const customerData = await contactCustomer.update(
                {
                    email: body.email,
                    company: body.company,
                    message: body.message,
                },
                { where: { id: req.params.id } }
            );

            if (!customerData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Unable to update data',
                });
            }

            const getUpdate = await contactCustomer.findOne({
                where: { id: req.params.id },
            });

            return res.status(200).json({
                status: 'success',
                message: 'Success to update data',
                data: getUpdate,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },

    deleteData: async (req, res) => {
        try {
            const customerData = await contactCustomer.findOne({
                where: { id: req.params.id },
            });

            if (!customerData) {
                return res.status(400).json({
                    status: 'failed',
                    message: 'Data not found',
                });
            }

            await contactCustomer.destroy({
                where: { id: req.params.id },
            });

            return res.status(200).json({
                status: 'success',
                message: 'Delete Successfully',
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'internal server error',
            });
        }
    },
};


import { body , validationResult} from "express-validator";

const validation = async(req,res,next) => {

    // manual way to validate error
    // const { name, price, imgUrl } = req.body;
    // let errors = [];
        
    // if (!name || name.trim() == '') {
    //     errors.push('Name is required');
    // }
    // if (!price || parseFloat(price) < 1) {
    //      errors.push('Enter a positive amount');
    // }
    // try {
    //     const validUrl = new URL(imgUrl);
    // } catch (err) {
    //     errors.push('URL is invalid');
    //  }

    //express-validator way / third-party approach

    //step-1 : make rule for validation
    let rule = [
        body('name').notEmpty().withMessage('Name is required'),
        body('price').isFloat({ gt: 0 }).withMessage('Price can not be negative'),
        // body('imgUrl').isURL().withMessage('Invalid URL')
    ];

    //step-2 run all rules
    await Promise.all(rule.map((rl) => rl.run(req)));

    //checking if any error after running
    var validationErrors = validationResult(req);

    //step-4 : if there are errors , return those errors
    if (!validationErrors.isEmpty()) {
        return res.render('new-products', { errorMessage: validationErrors.array()[0].msg });
    
    }

    next();
    
}

export default validation;
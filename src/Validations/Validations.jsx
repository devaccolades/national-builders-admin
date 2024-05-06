import * as Yup from "yup";

export const BranchAddSchema = Yup.object({
    location: Yup.string().trim().min(4).required("Please enter branch location"),
    image: Yup.string().trim().min(4).required("Please select image")
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp, svg)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    iframe: Yup.string().trim().required("Please enter branch map link"),
    address: Yup.string().trim().min(10).required("Please enter branch address"),
    email: Yup.string().trim().email().required("Please enter branch email"),
    phone_number: Yup.string().trim().required("Please enter branch phone number"),
});

export const BranchEditSchema = Yup.object({
    location: Yup.string().trim().min(4).required("Please enter branch location"),
    image: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp, svg)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    iframe: Yup.string().trim().required("Please enter branch map link"),
    address: Yup.string().trim().min(10).required("Please enter branch address"),
    email: Yup.string().trim().email().required("Please enter branch email"),
    phone_number: Yup.string().trim().required("Please enter branch phone number"),
});

export const AmenitiesAddSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter branch location"),
    logo: Yup.string().trim().min(4).required("Please select image")
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp, svg)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const AmenitiesEditSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter branch location"),
    logo: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp, svg)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

const amenitySchema = Yup.array()
    .of(Yup.string().required('Amenity is required'))
    .min(1, 'At least one amenity must be selected');

const MultitpleImageSchema = Yup.array()
    .of(Yup.string().required('Amenity is required'))
    .min(1, 'At least one amenity must be selected');

export const ProjectAddSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter Project Name"),
    description: Yup.string().trim().min(4).required("Please enter Project OverView"),
    rera_number: Yup.string().trim().min(4).required("Please enter Project Rera Number"),
    location: Yup.string().trim().min(4).required("Please enter Project Location"),
    company_branch: Yup.string().trim().min(1).required("Please Select Project Branch"),
    type: Yup.string().trim().min(1).required("Please Select project Type"),
    bedrooms: Yup.string().trim().min(1).required("Please Select Number Of Bedrooms"),
    units: Yup.string().trim().min(1).required("Please Select Project Units"),
    area_from: Yup.string().trim().min(1).required("Please Select Project Area From"),
    area_to: Yup.string().trim().min(1).required("Please Select Project Area To"),
    amenities: amenitySchema,
    qr_code: Yup.string().trim().min(4).required("Please select Qr code")
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp, svg)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    thumbnail: Yup.string().trim().min(4).required("Please select thumbnail Image")
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp, svg)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp', 'svg'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});


export const SpecificationAddSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter specificaation title"),
    description: Yup.string().trim().min(10).required("Please enter specificaation description"),
});
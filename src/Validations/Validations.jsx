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

const specificationSchema = Yup.array()
    .of(Yup.string().required('Amenity is required'))
    .min(1, 'At least one specification add');



const MultitpleImageSchema = Yup.array()
    .of(Yup.string().required('Amenity is required'))
    .min(1, 'At least one amenity must be selected');


export const ProjectAddSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter the project name."),
    description: Yup.string().trim().min(4).required("Please provide an overview of the project."),
    rera_number: Yup.string().trim().min(4).required("Please enter the project's RERA number."),
    location: Yup.string().trim().min(4).required("Please specify the project location."),
    company_branch: Yup.string().trim().min(1).required("Please select the project branch."),
    type: Yup.string().trim().min(1).required("Please select the project type."),
    bedrooms: Yup.string().trim().min(1).required("Please select the number of bedrooms."),
    units: Yup.string().trim().min(1).required("Please select the project units."),
    area_from: Yup.string().trim().min(1).required("Please select the project area (from)."),
    area_to: Yup.string().trim().min(1).required("Please select the project area (to)."),
    status: Yup.string().trim().min(1).required("Please select the project status."),
    slug: Yup.string().trim().min(1).required("Please enter the project slug."),
    iframe: Yup.string().trim().min(1).required("Please paste the project map link."),
    meta_title: Yup.string().trim().min(1).required("Please enter the project meta title."),
    meta_description: Yup.string().trim().min(1).required("Please provide the project description."),
    qr_code: Yup.string().trim().min(4).required("Please select the QR code image.")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    thumbnail: Yup.string().trim().min(4).required("Please select the thumbnail image.")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),

});

export const ProjectEditSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter the project name."),
    description: Yup.string().trim().min(4).required("Please provide an overview of the project."),
    rera_number: Yup.string().trim().min(4).required("Please enter the project's RERA number."),
    location: Yup.string().trim().min(4).required("Please specify the project location."),
    company_branch: Yup.string().trim().min(1).required("Please select the project branch."),
    type: Yup.string().trim().min(1).required("Please select the project type."),
    bedrooms: Yup.string().trim().min(1).required("Please select the number of bedrooms."),
    units: Yup.string().trim().min(1).required("Please select the project units."),
    area_from: Yup.string().trim().min(1).required("Please select the project area (from)."),
    area_to: Yup.string().trim().min(1).required("Please select the project area (to)."),
    status: Yup.string().trim().min(1).required("Please select the project status."),
    slug: Yup.string().trim().min(1).required("Please enter the project slug."),
    iframe: Yup.string().trim().min(1).required("Please paste the project map link."),
    meta_title: Yup.string().trim().min(1).required("Please enter the project meta title."),
    meta_description: Yup.string().trim().min(1).required("Please provide the project description."),
    qr_code: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    thumbnail: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
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

export const FloorImageAddSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    images: Yup.string().trim().min(4).required("Please select the a image.")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const FloorImageEditSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    images: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});
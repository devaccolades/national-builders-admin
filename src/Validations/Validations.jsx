import * as Yup from "yup";

export const BranchAddSchema = Yup.object({
    location: Yup.string().trim().min(4).required("Please enter branch location"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim().min(4).required("Please select image")
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
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
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
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
    image_alt: Yup.string().trim().min(1).required("Please enter the logo alt tag."),
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
    image_alt: Yup.string().trim().min(1).required("Please enter the logo alt tag."),
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
    slug: Yup.string().trim() .min(4, "Slug must be at least 4 characters long")
    .max(50, "Slug must be at most 50 characters long").required("Please enter a slug"),
    thumbnail_alt: Yup.string().trim().min(1).required("Please enter the thumbnail alt tag ."),
    qr_code_alt: Yup.string().trim().min(1).required("Please enter the qr code alt tag ."),
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
    slug: Yup.string().trim() .min(4, "Slug must be at least 4 characters long")
    .max(50, "Slug must be at most 50 characters long").required("Please enter a slug"),
    thumbnail_alt: Yup.string().trim().min(1).required("Please enter the thumbnail alt tag ."),
    qr_code_alt: Yup.string().trim().min(1).required("Please enter the qr code alt tag ."),
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

export const ProjectImageAddSchema = Yup.object({
    project: Yup.string().trim().min(4).required("Please enter branch location"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    images: Yup.string().trim().min(4).required("Please select image")
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const ProjectImageEditSchema = Yup.object({
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    images: Yup.string().trim().min(4)
        .test('fileType', 'Invalid file format, only images are allowed (jpg, jpeg, png, webp)', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const SpecificationAddSchema = Yup.object({
    project: Yup.string().trim().required("Please enter specificaation title"),
    title: Yup.string().trim().min(4).required("Please enter specificaation title"),
    description: Yup.string().trim().min(10).required("Please enter the specificaation description"),
});

export const NearByAddSchema = Yup.object({
    project: Yup.string().trim().required("Please enter near by location"),
    location_name: Yup.string().trim().required("Please enter near by title"),
    distance: Yup.string().trim().required("Please enter distance"),
    measurement_unit: Yup.string().trim().required("Please select unit"),
});

export const FloorImageAddSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
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
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
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


export const RentalsAddSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter a name"),
    company_branch: Yup.string().trim().required("Please select the branch"),
    type: Yup.string().trim().required("Please select the type"),
    area: Yup.string().trim().required("Please enter the area (sq.ft)"),
    price: Yup.string().trim().required("Please enter the price"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim().required("Please select the image")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const RentalsEditSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter a name"),
    company_branch: Yup.string().trim().required("Please select the branch"),
    type: Yup.string().trim().required("Please select the type"),
    area: Yup.string().trim().required("Please enter the area (sq.ft)"),
    price: Yup.string().trim().required("Please enter the price"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim()
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const KeyHandoverAddSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter a name"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim().required("Please select the image")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const KeyHandoverEditSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter a name"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim()
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});


export const TestimonialsAddSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter a name"),
    project: Yup.string().trim().min(4).required("Please select the project"),
    description: Yup.string().trim().required("Please enter the description"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim().required("Please select the image")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const TestimonialsEditSchema = Yup.object({
    name: Yup.string().trim().min(4).required("Please enter a name"),
    project: Yup.string().trim().min(4).required("Please select the project"),
    description: Yup.string().trim().required("Please enter the description"),
    image_alt: Yup.string().trim().min(1).required("Please enter the image alt tag."),
    image: Yup.string().trim()
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const BlogsAddSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    image_alt: Yup.string().trim().required("Please enter a image alt tag"),
    meta_tag: Yup.string().trim().required("Please enter a meta title "),
    meta_description: Yup.string().trim().required("Please enter a meta description"),
    slug: Yup.string().trim() .min(4, "Slug must be at least 4 characters long")
    .max(50, "Slug must be at most 50 characters long").required("Please enter a slug"),
    body: Yup.string().trim().required("Please enter the blog content"),
    image: Yup.string().trim().required("Please select the image")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const BlogsEditSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    image_alt: Yup.string().trim().required("Please enter a image alt tag"),
    meta_tag: Yup.string().trim().required("Please enter a meta title"),
    meta_description: Yup.string().trim().required("Please enter a meta description"),
    slug: Yup.string().trim() .min(4, "Slug must be at least 4 characters long")
    .max(50, "Slug must be at most 50 characters long").required("Please enter a slug"),
    body: Yup.string().trim().required("Please enter the blog content"),
    image: Yup.string().trim()
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const NewsAndEventsAddSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    image_alt: Yup.string().trim().required("Please enter a image alt tag"),
    meta_tag: Yup.string().trim().required("Please enter a meta tag "),
    youtube_link: Yup.string().trim(),
    meta_description: Yup.string().trim().required("Please enter a meta description"),
    slug: Yup.string().trim() .min(4, "Slug must be at least 4 characters long")
    .max(50, "Slug must be at most 50 characters long").required("Please enter a slug"),
    body: Yup.string().trim().required("Please enter the content"),
    image: Yup.string().trim().required("Please select the image")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});

export const NewsAndEventsEditSchema = Yup.object({
    title: Yup.string().trim().min(4).required("Please enter a title"),
    image_alt: Yup.string().trim().required("Please enter a image alt tag"),
    meta_tag: Yup.string().trim().required("Please enter a meta tag "),
    youtube_link: Yup.string().trim(),
    meta_description: Yup.string().trim().required("Please enter a meta description"),
    slug: Yup.string().trim() .min(4, "Slug must be at least 4 characters long")
    .max(50, "Slug must be at most 50 characters long").required("Please enter a slug"),
    body: Yup.string().trim().required("Please enter the content"),
    image: Yup.string().trim()
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
});


export const SeoAddSchema = Yup.object({
    page: Yup.string().trim().required("Please enter a page name"),
    path: Yup.string().trim().required("Please enter a page path"),
    meta_title: Yup.string().trim().required("Please enter the meta title"),
    meta_description: Yup.string().trim().required("Please enter the meta description"),
});

export const ProjectCountHomePageSchema = Yup.object({
    launched: Yup.string().trim().required("Please enter a launched project's count"),
    projectcompleted: Yup.string().trim().required("Please enter a completed project's count"),
    readytooccupy: Yup.string().trim().required("Please enter a ready to move project's count"),
    ongoing: Yup.string().trim().required("Please enter a ongoing project's count"),
});

export const HomePageAwardsSchema = Yup.object({
    image_alt: Yup.string().trim().required("Please enter a image alt tag"),
    images: Yup.string().trim().required("Please select the image")
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    
});

export const HomePageAwardsEditSchema = Yup.object({
    image_alt: Yup.string().trim().required("Please enter a image alt tag"),
    images: Yup.string().trim()
        .test('fileType', 'Invalid file format. Only images (jpg, jpeg, png, webp) are allowed.', function (value) {
            if (value) {
                const acceptedFormats = ['jpg', 'jpeg', 'png', 'webp'];
                const extension = value.split('.').pop().toLowerCase();
                return acceptedFormats.includes(extension);
            }
            return true;
        }),
    
});

export const HomePageVideosSchema = Yup.object({
    desktop_video: Yup.string().trim().required("Please add a desktop video"),
    mobile_video: Yup.string().trim().required("Please add a mobile video"),
    
});

export const HomePageVideoEditsSchema = Yup.object({
    desktop_video: Yup.string().trim(),
    mobile_video: Yup.string().trim()
    
});
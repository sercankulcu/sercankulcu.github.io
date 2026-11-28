# -*- coding: utf-8 -*-
ICERIK = dict(
    excerpt=('Guide to AI and Data Courses, Chapter 22 slides: Computer Graphics — transformations, the graphics '
             'pipeline, lighting, ray tracing, history, neighboring courses and overlaps.'),
    gundem=['Transformations', 'Graphics pipeline', 'Lighting', 'Ray tracing', 'Animation', 'Neighboring courses'],
    tanim=('Computer graphics studies how to <b>render an image</b> from a scene described by geometry, materials, '
           'lights and a camera. It is the inverse of computer vision: vision recovers the scene from an image, '
           'graphics produces the image from the scene.'),
    tarihce=[
        ('1963', 'Sutherland\'s Sketchpad shows drawing on screen with a light pen; interactive graphics begins.'),
        ('1975', 'Phong publishes his reflection model and shading method; shiny surfaces look real.'),
        ('1980', 'Whitted\'s ray tracing unifies reflection, refraction and shadows in one method.'),
        ('1986', 'Kajiya publishes the rendering equation: the basis of physically based rendering.'),
        ('1995', 'Toy Story becomes the first fully computer-generated feature film.'),
        ('2018', 'Hardware ray tracing reaches consumer GPUs; real-time ray tracing begins.'),
    ],
    kavramlar=[
        ('Homogeneous coordinates', 'Writing translation, rotation and scaling as 4×4 matrices.'),
        ('Model-view-projection', 'The chain of transforms from object space to screen space.'),
        ('Triangle mesh', 'Representing surfaces with vertices and triangles.'),
        ('Rasterization', 'Finding the pixels a triangle covers.'),
        ('Z-buffer', 'Visibility by keeping the nearest surface per pixel.'),
        ('Lighting model', 'Ambient, diffuse and specular: Phong, Blinn-Phong.'),
        ('Texture mapping', 'Wrapping an image or pattern on a surface; UV coordinates.'),
        ('Ray tracing', 'Shooting rays from the camera and tracing light paths backward.'),
    ],
    akis=[('Scene', 'models, lights,\ncamera'), ('Vertex\nprocessing', 'transform\nmatrices'), ('Raster', 'triangles\nto pixels'),
          ('Fragment\nshading', 'light, texture,\nmaterial'), ('Image', 'frame\nbuffer')],
    akis_ornek=('<b>Example:</b> In a game, a character\'s triangle mesh is projected to the screen by the world and camera '
                'matrices, rasterization finds the pixels each triangle covers, and a shader computes each pixel\'s '
                'color from light and texture. This repeats 60 times a second.'),
    onkosul_ek=[
        ('Programming with C', 'APIs such as OpenGL and Vulkan are used from C/C++', '/teaching/programming-with-c/?lang=en'),
        ('Analytic geometry', 'vectors, planes, line-plane intersection: the language of ray tracing', None),
    ],
    ayrisma=[
        ('BG', 'Computer vision tries to recover the scene from an image; computer graphics produces the image from the scene.'),
        ('GI', 'Image processing transforms an existing image; computer graphics builds the image from geometry and light.'),
        ('UM', 'Generative models synthesize images learned from data; computer graphics computes them from physics and geometry.'),
        ('GPU', 'GPU programming focuses on general parallel computing; computer graphics uses the GPU as a tool for rendering.'),
    ],
    uygulamalar=[
        ('Games', 'Real-time graphics at tens of frames per second.'),
        ('Film and animation', 'Physically based rendering taking minutes per frame.'),
        ('CAD and architecture', 'Seeing a design before it is built.'),
        ('Simulation', 'Flight and driving simulators.'),
        ('Virtual reality', 'Low-latency images for two eyes.'),
        ('Scientific visualization', 'Medical volume data, flow and weather models.'),
    ],
    araclar=['OpenGL', 'Vulkan', 'WebGL and three.js', 'Blender', 'Unity', 'Unreal Engine'],
    veri_baslik='Classic test scenes',
    veriler=['Utah teapot', 'Stanford bunny', 'Cornell box', 'Sponza atrium', 'Suzanne (Blender)'],
    araclar_not='A graphics course gives a <b>scene</b> instead of a dataset: once geometry, materials, lights and camera are known, the image is computed.',
    yanilgilar=[
        ('Computer graphics is just making games.', 'Film, architecture, medicine, simulation and scientific visualization are graphics too.'),
        ('Ray tracing is a new invention.', 'The method dates from 1980; what is new is hardware that runs it in real time.'),
        ('Graphics and computer vision are the same.', 'Each is the inverse of the other; they share the camera model but go opposite ways.'),
        ('More triangles are enough for realism.', 'Light, shadow and material often matter more than geometric detail.'),
    ],
    meslekler=['Graphics programmer', 'Game engine developer', 'Technical artist', 'XR developer', 'Visualization engineer'],
    sonra=('Graphics uses linear algebra and GPU programming more concretely than any other course. From here you can '
           'move to real-time rendering, physically based rendering, or in the other direction to computer vision; '
           'generative models and neural rendering are steadily merging the two fields.'),
    kaynaklar=[
        'Marschner and Shirley, <em>Fundamentals of Computer Graphics</em>, 4th ed., CRC Press, 2016.',
        'Hughes, van Dam, McGuire et al., <em>Computer Graphics: Principles and Practice</em>, 3rd ed., Addison-Wesley, 2013.',
        'Akenine-Möller, Haines, Hoffman et al., <em>Real-Time Rendering</em>, 4th ed., CRC Press, 2018.',
        'Pharr, Jakob and Humphreys, <em>Physically Based Rendering</em>, 4th ed., MIT Press, 2023.',
    ],
    islenenler=[
        'Raster images, color and gamma',
        'Vectors, matrices and 2D/3D transformations',
        'Viewing: camera, projection, view volume',
        'Triangle meshes and surface representation',
        'Rasterization and visibility with the z-buffer',
        'Shading: Phong and Blinn-Phong',
        'Texture mapping, UV coordinates and mipmaps',
        'The graphics pipeline and GPU shaders',
        'Ray tracing and acceleration structures (BVH)',
        'Curves and surfaces: Bézier, B-splines',
        'The rendering equation and Monte Carlo path tracing',
        'Animation: keyframes, skeletons, physics simulation',
    ],
    beceriler=['drawing with OpenGL or WebGL', 'writing GLSL shaders', 'building 3D scenes with three.js',
               'writing a simple ray tracer', 'preparing models and scenes in Blender'],
    hazirlik=[
        ('Can you rotate and translate a point with a 4×4 matrix?', '@DC'),
        ('Can you find the point where a ray hits a plane?', 'Line and plane equations from analytic geometry'),
        ('Can you write a C or C++ program that uses arrays and structs?', 'An intro C course, then a short introduction to C++'),
        ('Can you explain why a GPU runs thousands of threads in parallel?', '@GPU'),
    ],
    riskler=[
        ('Photorealistic fakes', 'Realistic rendering makes it easy to produce a convincing photo or video of an event that never happened.'),
        ('Photosensitive epilepsy', 'Fast flashing patterns can trigger seizures; in 1997 a Pokémon episode sent hundreds of children in Japan to hospital.'),
        ('VR sickness', 'High latency or a low frame rate causes dizziness and nausea in VR; timing is as much a safety issue as the image.'),
        ('Convincing but wrong', 'Architectural and scientific visualization approximate light and materials; a beautiful image can justify a wrong decision.'),
    ],
)

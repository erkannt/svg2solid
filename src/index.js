import { renderSVG } from './render-svg';
import { setupScene } from './setup-scene';
import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const exampleSvgData = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Created with Inkscape (http://www.inkscape.org/) -->

<svg
   width="50mm"
   height="50mm"
   viewBox="0 0 50 50"
   version="1.1"
   id="svg1"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <defs
     id="defs1">
    <rect
       x="-45.516754"
       y="0.88342857"
       width="87.795021"
       height="63.975795"
       id="rect2" />
    <rect
       x="199.40019"
       y="292.48999"
       width="362.56128"
       height="149.03877"
       id="rect1" />
    <rect
       x="199.40019"
       y="292.48999"
       width="362.56128"
       height="149.03877"
       id="rect1-4" />
    <rect
       x="199.40019"
       y="292.48999"
       width="362.56128"
       height="149.03877"
       id="rect1-6" />
  </defs>
  <g
     id="layer2" />
  <g
     id="layer1">
    <path
       id="path2"
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#ffffff;stroke-width:0.264583"
       d="M 28.657166 1.0138916 C 24.608105 1.3028475 20.363931 1.7511646 16.831531 3.9196574 C 15.591978 4.8126285 14.937752 6.4065501 15.217676 7.9121785 C 15.278396 9.5157491 15.455773 11.136463 15.99954 12.655558 C 15.067705 12.612578 14.137014 12.723468 13.203328 12.670028 C 12.577773 12.652708 11.943921 12.891142 11.357963 12.94443 C 9.3281081 12.11073 6.9656307 12.281105 4.9557699 13.077755 C 2.8668207 14.055004 1.7723233 16.639807 2.4902873 18.827275 C 2.8583619 20.132122 3.7201033 21.225171 4.6472616 22.185726 C 4.124689 21.764813 3.7306327 21.765934 3.5419027 22.455994 C 2.6851488 23.919301 1.8309251 25.785465 2.6758057 27.444836 C 3.5567612 29.110951 5.6399635 29.497138 7.3613078 29.427661 C 9.3136256 29.504361 11.315751 28.612496 12.466939 27.014889 C 12.774678 28.426118 14.166593 29.406009 15.588196 29.33206 C 16.378041 29.32816 17.164029 29.210756 17.949292 29.141374 C 17.899752 30.028064 18.102582 30.932038 18.542021 31.705042 C 18.414243 32.263637 18.028989 32.217733 17.573088 32.072461 C 15.616456 31.774249 13.454689 32.014921 11.803414 33.169035 C 9.8725387 34.647392 9.463714 37.586441 10.72286 39.626522 C 11.154586 40.407989 11.746842 41.085452 12.362553 41.726652 C 11.846758 41.298009 11.460107 41.312242 11.266496 41.994336 C 10.400936 43.459874 9.5396128 45.336439 10.391614 47.001265 C 11.295532 48.69557 13.428975 49.066977 15.179435 48.972721 C 16.765494 48.978821 18.368176 48.412623 19.542993 47.349565 C 20.924745 48.859924 23.198711 49.250212 25.153503 48.849215 C 25.991024 48.703548 26.808046 48.392904 27.470675 47.850309 C 27.88873 48.649003 28.876729 48.951763 29.711365 48.727775 C 30.659855 48.742895 31.658287 48.802825 32.553569 48.489547 C 33.378883 49.044052 34.403695 48.59592 35.319291 48.741211 C 36.332487 48.761431 37.505243 48.584995 38.145992 47.708199 C 40.032393 49.329249 42.765163 49.178418 45.025159 48.584115 C 45.951952 48.336416 46.832801 47.950955 47.729903 47.616215 L 47.729903 26.159644 C 45.861967 26.533698 43.745918 25.835282 42.075985 26.998869 C 40.840861 27.906266 40.955132 29.611881 41.014551 30.97537 C 40.930281 31.360517 41.249928 32.121431 40.64093 32.04869 C 39.876447 32.203707 39.153688 32.558572 38.554753 33.057414 C 38.528383 32.633883 38.241493 32.306237 38.462252 31.894177 C 38.880506 30.251385 38.785322 28.142494 37.274211 27.074316 C 36.7043 26.893796 36.923235 26.598139 37.256641 26.225273 C 39.73983 22.711355 42.166632 18.866004 42.582931 14.479736 C 42.913716 11.152163 42.348759 7.5692046 40.319503 4.8363973 C 38.577879 2.5982153 35.77987 1.4693166 33.020723 1.1880412 C 31.575866 0.98977392 30.112799 0.98318237 28.657166 1.0138916 z M 29.885514 2.9429728 C 33.897898 2.9429728 36.706922 3.7928086 38.311873 5.4921712 C 39.916829 7.1915338 40.718962 9.6697469 40.718962 12.92686 C 40.718962 15.051061 40.27071 17.057429 39.373824 18.945614 C 38.476936 20.833792 37.343997 22.745277 35.975065 24.680664 C 34.812199 26.324716 33.483543 28.072697 32.048173 29.887065 L 32.048173 37.988379 C 32.620616 37.986287 33.186525 37.983543 33.713704 37.97391 L 33.713704 35.404041 C 33.713704 35.101173 33.755657 34.865366 33.839795 34.697107 C 33.923932 34.528848 34.067324 34.410943 34.269226 34.34364 C 34.487964 34.259502 34.782208 34.209044 35.152376 34.192228 C 35.522547 34.175415 36.002143 34.167424 36.591048 34.167424 L 36.591048 37.827148 C 37.185924 37.776146 37.789483 37.725188 38.27415 37.674186 C 38.457131 36.802709 38.694952 36.094238 38.988835 35.555452 C 39.308526 34.983372 39.678716 34.571224 40.099361 34.318835 C 40.520009 34.049623 40.974117 33.914726 41.462069 33.914726 C 41.798587 33.914726 42.092831 33.956679 42.345219 34.040816 C 42.597608 34.124953 42.799952 34.234362 42.951383 34.368962 L 42.951383 29.47262 C 42.951383 29.169753 42.984853 28.934463 43.052153 28.766203 C 43.136288 28.597944 43.279164 28.480041 43.481067 28.412736 C 43.682979 28.328598 43.969245 28.278141 44.339412 28.261324 C 44.709583 28.244511 45.189178 28.236003 45.778084 28.236003 L 45.778084 46.28193 C 45.340611 46.467013 44.819053 46.635376 44.213322 46.786808 C 43.624417 46.955067 42.917507 47.038989 42.093038 47.038989 C 41.554608 47.038989 41.041549 46.980032 40.553597 46.862256 C 40.065645 46.744479 39.62801 46.475207 39.241016 46.054553 C 39.086241 45.878674 38.945927 45.664853 38.814685 45.427201 L 36.591048 45.427201 L 36.591048 46.28193 C 36.591048 46.416539 36.574059 46.517454 36.540405 46.584753 C 36.506752 46.652053 36.397343 46.702511 36.21226 46.736165 C 36.044002 46.752979 35.758255 46.769968 35.354431 46.786808 L 33.713704 46.786808 L 33.713704 45.427201 L 32.048173 45.427201 L 32.048173 46.28193 C 32.048173 46.416539 32.031183 46.517454 31.99753 46.584753 C 31.96387 46.652053 31.854463 46.702511 31.669385 46.736165 C 31.501126 46.752979 31.223356 46.769968 30.836361 46.786808 L 29.220955 46.786808 L 29.220955 45.427201 L 27.030908 45.427201 C 27.011558 45.45855 26.995037 45.494486 26.975098 45.52487 C 26.638579 46.046471 26.209439 46.433136 25.687838 46.685522 C 25.166234 46.921086 24.568734 47.038989 23.895699 47.038989 C 23.205838 47.038989 22.608339 46.955067 22.10356 46.786808 C 21.615611 46.635375 21.203462 46.332117 20.866943 45.87782 C 20.776485 45.744512 20.69413 45.591494 20.615796 45.427201 L 18.607133 45.427201 C 18.443761 45.667004 18.249217 45.886327 18.014921 46.079875 C 17.257756 46.719258 16.231633 47.038989 14.936039 47.038989 C 14.532218 47.038989 14.145039 47.014022 13.77487 46.963542 C 13.421526 46.913062 13.110289 46.837119 12.841077 46.736165 C 12.588687 46.618389 12.378366 46.467019 12.210107 46.28193 C 12.058676 46.080018 11.982731 45.835716 11.982731 45.549674 C 11.982731 45.347765 12.016717 45.112469 12.084017 44.843258 C 12.151317 44.557216 12.269221 44.262974 12.437484 43.960107 C 12.790826 44.145194 13.152518 44.288067 13.522689 44.389022 C 13.909682 44.473159 14.279872 44.515112 14.633215 44.515112 C 15.070689 44.515112 15.390419 44.422696 15.59233 44.23761 C 15.67858 44.157995 15.742661 44.066303 15.794902 43.968376 C 15.87515 43.817951 15.920475 43.648861 15.920475 43.455229 C 15.920475 43.270143 15.886485 43.059823 15.819189 42.824259 C 15.815889 42.808969 15.808333 42.792734 15.804203 42.777234 C 15.74475 42.5539 15.600961 42.309351 15.364954 42.041878 L 13.169222 39.719539 C 12.731748 39.248417 12.420513 38.777312 12.235429 38.306189 C 12.050343 37.835063 11.957926 37.414421 11.957926 37.04425 C 11.957926 36.60678 12.024857 36.194631 12.159465 35.807633 C 12.310896 35.420639 12.546706 35.092412 12.866398 34.823197 C 13.18609 34.537158 13.606732 34.318855 14.128337 34.167424 C 14.666764 33.999165 15.331197 33.914726 16.122013 33.914726 C 16.828703 33.914726 17.38424 33.973683 17.788062 34.091459 C 18.208707 34.192414 18.519943 34.326792 18.721855 34.495052 C 18.818013 34.561624 18.891274 34.632817 18.954915 34.705892 C 19.634726 33.606072 20.33173 32.548557 21.049361 31.543294 C 20.890709 31.451832 20.745614 31.354773 20.624581 31.247188 C 20.33854 30.977974 20.144692 30.675232 20.043738 30.338717 C 19.942783 30.002196 19.892326 29.673969 19.892326 29.354281 C 19.892326 28.765373 20.043695 28.226829 20.346562 27.738875 C 20.666251 27.267754 21.078919 26.855603 21.583695 26.502258 C 21.146225 26.367644 20.801003 26.18229 20.548617 25.946737 C 20.313053 25.711173 20.212141 25.416931 20.245793 25.063586 C 20.262606 24.710244 20.389006 24.340057 20.624581 23.95306 C 20.876971 23.566064 21.27213 23.153915 21.810555 22.716443 C 21.27213 22.346271 20.884947 21.849687 20.649386 21.227128 C 20.430649 20.587745 20.321757 19.86436 20.321757 19.056718 C 20.321757 18.164945 20.414177 17.416077 20.599259 16.810343 C 20.801169 16.204612 21.086918 15.725014 21.457088 15.371672 C 21.827258 15.001501 22.27339 14.740724 22.794991 14.58929 C 23.333421 14.437859 23.930918 14.362431 24.58713 14.362431 C 24.990949 14.362431 25.411594 14.437859 25.849068 14.58929 L 28.852502 14.58929 C 28.93664 14.740724 29.003566 14.934573 29.054041 15.170133 C 29.121338 15.388871 29.155326 15.657629 29.155326 15.977319 C 29.155326 16.34749 29.070886 16.616763 28.902629 16.785022 C 28.73437 16.936456 28.524048 17.012398 28.271659 17.012398 L 28.019478 17.012398 C 27.93534 16.995578 27.842922 16.978589 27.741976 16.961755 C 27.92706 17.247796 28.069936 17.576022 28.17089 17.946191 C 28.288668 18.31636 28.347624 18.745501 28.347624 19.233451 C 28.347624 20.59635 28.027893 21.622473 27.388509 22.312333 C 26.765953 23.002193 25.722839 23.347412 24.258984 23.347412 L 23.905518 23.347412 C 23.804563 23.347412 23.695153 23.338904 23.577372 23.322091 C 23.37546 23.608131 23.274548 23.84394 23.274548 24.029024 C 23.274548 24.230934 23.484871 24.348321 23.905518 24.381974 C 24.326164 24.398788 24.839227 24.457745 25.444958 24.558708 C 25.717506 24.605552 25.973174 24.661533 26.213387 24.725623 C 26.408428 24.469927 26.651648 24.150351 26.841256 23.9019 C 28.210188 22.10813 29.34313 20.432051 30.240015 18.8743 C 31.136899 17.269346 31.585152 15.735337 31.585152 14.271997 C 31.585152 13.044678 31.207675 12.124066 30.452405 11.510409 C 29.697132 10.849544 28.682151 10.519255 27.407629 10.519255 C 26.841176 10.519255 26.156485 10.566437 25.354008 10.660848 C 24.551531 10.755259 23.701695 10.896812 22.80481 11.085628 C 21.955127 11.274447 21.10581 11.510884 20.256128 11.794112 C 19.453653 12.030133 18.745369 12.31324 18.13171 12.643673 L 18.13171 12.714469 C 17.659664 11.67597 17.376558 10.613805 17.282149 9.5281006 C 17.187741 8.3951921 17.140556 7.5217642 17.140556 6.9081055 C 17.140556 6.3416511 17.494436 5.822623 18.202507 5.3505778 C 18.957776 4.8785328 19.925576 4.4769486 21.105688 4.1465169 C 22.333006 3.7688808 23.701869 3.4857745 25.212415 3.2969564 C 26.722958 3.0609337 28.280562 2.9429728 29.885514 2.9429728 z M 8.4087891 14.362431 C 9.1154768 14.362431 9.6705007 14.421384 10.07432 14.539164 C 10.494969 14.64012 10.806202 14.774498 11.008114 14.942757 C 11.226848 15.094191 11.361746 15.262551 11.412223 15.447636 C 11.479531 15.632722 11.512992 15.801082 11.512992 15.952515 C 11.512992 16.17125 11.462537 16.406544 11.36158 16.658931 C 11.260628 16.911321 11.126247 17.130137 10.957987 17.315222 C 10.621472 17.130138 10.268275 16.995758 9.8981038 16.911629 C 9.5447601 16.827498 9.1745733 16.785022 8.7875773 16.785022 C 7.996761 16.785022 7.6010864 17.037822 7.6010864 17.542598 C 7.6010864 17.677206 7.6345561 17.837071 7.7018555 18.022156 C 7.7859859 18.207241 7.9963077 18.468017 8.3328247 18.804537 L 10.200928 20.697445 C 10.453315 20.983484 10.655142 21.252242 10.806576 21.504631 C 10.974833 21.757018 11.109215 22.001323 11.210168 22.236886 C 11.311125 22.472445 11.378571 22.724731 11.412223 22.993945 C 11.445877 23.246335 11.462866 23.532601 11.462866 23.852291 C 11.462866 24.996453 11.075689 25.888195 10.301697 26.52758 C 9.5445306 27.166963 8.5178917 27.486694 7.2222982 27.486694 C 6.8184765 27.486694 6.431815 27.461203 6.0616455 27.41073 C 5.7083036 27.360254 5.397067 27.284829 5.1278524 27.18387 C 4.875464 27.066095 4.6651424 26.914208 4.4968831 26.729118 C 4.3454505 26.527207 4.2695068 26.283419 4.2695068 25.99738 C 4.2695068 25.795469 4.3034904 25.560176 4.3707926 25.290963 C 4.438095 25.004921 4.5554822 24.71016 4.7237427 24.407296 C 5.0770865 24.592382 5.4387781 24.735256 5.8089478 24.83621 C 6.195943 24.920347 6.5661309 24.962817 6.9194743 24.962817 C 7.3569478 24.962817 7.6766777 24.869884 7.8785889 24.684798 C 8.0973249 24.482887 8.2067342 24.222109 8.2067342 23.902417 C 8.2067342 23.717331 8.1732649 23.507011 8.1059652 23.271448 C 8.0554906 23.035885 7.904121 22.775106 7.6517293 22.489067 L 5.4559977 20.167244 C 5.0185248 19.69612 4.7072893 19.22502 4.5222046 18.753894 C 4.3371198 18.282771 4.2441854 17.862124 4.2441854 17.491956 C 4.2441854 17.054481 4.3116328 16.642333 4.4462402 16.255339 C 4.5976731 15.868342 4.833482 15.540115 5.1531738 15.270903 C 5.4728657 14.984861 5.8935093 14.766045 6.4151123 14.614612 C 6.9535404 14.446353 7.6179721 14.362431 8.4087891 14.362431 z M 15.147396 14.614612 L 15.601632 18.249015 C 15.668932 18.787445 15.727884 19.409912 15.778365 20.116602 C 15.845665 20.806462 15.904619 21.462914 15.955098 22.085474 C 16.022398 22.808987 16.072856 23.540866 16.10651 24.281205 L 16.157153 24.281205 C 16.190813 23.540866 16.241271 22.808987 16.308565 22.085474 C 16.342219 21.462914 16.384182 20.806462 16.434656 20.116602 C 16.501956 19.409912 16.569403 18.787445 16.636711 18.249015 L 16.990177 15.170133 C 17.007011 15.035527 17.031978 14.934095 17.065625 14.866793 C 17.116098 14.782663 17.234003 14.724227 17.419092 14.690576 C 17.604178 14.656923 17.890443 14.639933 18.277437 14.639933 C 18.681259 14.623113 19.244778 14.614612 19.96829 14.614612 L 17.444413 27.233997 C 17.158374 27.28447 16.813156 27.318456 16.409334 27.335282 C 16.005513 27.352096 15.669307 27.360087 15.400094 27.360087 C 15.029924 27.360087 14.760651 27.242699 14.592391 27.007137 C 14.424126 26.754752 14.297732 26.451492 14.213603 26.098149 L 12.068514 15.447636 C 12.018027 15.245725 12.001038 15.085858 12.017871 14.968079 C 12.034691 14.850297 12.135603 14.765859 12.320695 14.715381 C 12.522605 14.664908 12.842335 14.639933 13.27981 14.639933 C 13.717282 14.6231 14.339754 14.614612 15.147396 14.614612 z M 24.460522 16.356108 C 24.124006 16.356108 23.846752 16.54146 23.628015 16.911629 C 23.426104 17.264973 23.325191 17.937899 23.325191 18.930627 C 23.325191 19.822401 23.400618 20.436377 23.552051 20.772892 C 23.703485 21.092586 23.981253 21.25245 24.385075 21.25245 C 24.570161 21.25245 24.730024 21.218978 24.864632 21.151681 C 25.016066 21.067543 25.133971 20.924152 25.218099 20.722249 C 25.319054 20.52034 25.385978 20.243086 25.419637 19.889742 C 25.47011 19.519571 25.495601 19.048471 25.495601 18.476392 C 25.495601 17.668748 25.419659 17.113211 25.268225 16.810343 C 25.116793 16.50748 24.847519 16.356108 24.460522 16.356108 z M 23.779427 26.805082 C 23.493387 27.02382 23.257579 27.2846 23.072493 27.587463 C 22.904237 27.907157 22.820313 28.251855 22.820312 28.622026 C 22.820312 28.791442 22.850424 28.938519 22.907129 29.065409 C 23.492139 28.296796 24.001052 27.629551 24.548889 26.910502 C 24.329738 26.872507 24.083549 26.836542 23.779427 26.805082 z M 35.379236 28.513505 C 35.900837 28.513505 36.25455 28.6484 36.439636 28.917615 C 36.624721 29.186827 36.717139 29.666423 36.717139 30.356287 C 36.717139 31.046148 36.582758 31.584182 36.313546 31.971175 C 36.061156 32.341346 35.69097 32.526697 35.203019 32.526697 C 34.782372 32.526697 34.445648 32.383822 34.193262 32.097782 C 33.957699 31.811741 33.839795 31.273191 33.839795 30.482377 C 33.839795 29.89347 33.957699 29.422369 34.193262 29.069027 C 34.445648 28.698856 34.840806 28.513505 35.379236 28.513505 z M 29.220955 33.619137 C 28.645003 34.430448 28.072992 35.264052 27.508398 36.137846 C 27.618253 36.453477 27.710889 36.804148 27.7828 37.195662 C 27.832527 37.439323 27.872312 37.709173 27.90734 37.992513 L 29.220955 37.992513 L 29.220955 33.619137 z M 16.500802 36.337834 C 15.709983 36.337834 15.314311 36.590117 15.314311 37.094893 C 15.314311 37.229505 15.348297 37.389372 15.415597 37.574451 C 15.499725 37.759534 15.710048 38.020314 16.046566 38.356832 L 16.634127 38.952661 C 16.66281 38.892196 16.685543 38.831742 16.715776 38.771277 C 16.951795 38.252026 17.258497 37.638631 17.636133 36.930562 C 17.711111 36.797536 17.789069 36.672192 17.864543 36.540405 C 17.779999 36.515277 17.697704 36.483555 17.611328 36.463924 C 17.257984 36.37979 16.887797 36.337834 16.500802 36.337834 z M 42.421183 36.337834 C 42.286571 36.337834 42.143697 36.371303 41.992269 36.438603 C 41.857655 36.505903 41.731257 36.682759 41.613481 36.968803 C 41.495705 37.254843 41.394792 37.691961 41.310657 38.280868 C 41.294421 38.39126 41.287069 38.552389 41.273966 38.680326 C 41.274297 38.647716 41.274684 38.616997 41.275 38.584208 C 41.21566 39.128021 41.184566 39.827913 41.184566 40.703975 C 41.184566 41.087906 41.19006 41.424203 41.199036 41.735437 C 41.198718 41.745426 41.198239 41.754667 41.198002 41.764893 C 41.19937 41.813646 41.202643 41.848953 41.204203 41.896151 C 41.204277 41.898376 41.204129 41.90013 41.204203 41.902352 C 41.204188 41.902864 41.204218 41.903391 41.204203 41.903902 C 41.212198 42.143489 41.221198 42.375893 41.234692 42.571562 C 41.268352 43.059512 41.31881 43.455186 41.386104 43.758053 C 41.470242 44.04409 41.571672 44.245918 41.689445 44.3637 C 41.807221 44.481476 41.950096 44.540434 42.118359 44.540434 C 42.454876 44.540434 42.732647 44.455994 42.951383 44.287736 L 42.951383 36.463924 C 42.816773 36.379786 42.639915 36.337834 42.421183 36.337834 z " />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#e01b24;stroke-width:0.264583"
       d="m 27.90734,37.992513 c 0.0835,0.675393 0.127641,1.457147 0.127641,2.357996 0,1.211466 -0.09242,2.246597 -0.277502,3.10472 -0.158764,0.79382 -0.403021,1.447799 -0.726571,1.971972 h 2.190047 v -7.434688 z"
       id="path8" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#e01b24;stroke-width:0.264583"
       d="m 33.713704,37.97391 c -0.52717,0.0096 -1.093091,0.01238 -1.665531,0.01447 v 7.438822 h 1.665531 z"
       id="path7" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#e01b24;stroke-width:0.264583"
       d="m 38.273633,37.677804 c -0.5009,0.05242 -1.065222,0.104678 -1.682585,0.157096 v 7.592301 h 2.223637 c -0.182647,-0.330735 -0.345071,-0.713895 -0.482141,-1.16427 -0.218738,-0.790818 -0.328145,-1.859414 -0.328145,-3.205489 0,-1.295597 0.08392,-2.397661 0.252181,-3.306258 0.0052,-0.02571 0.01172,-0.04795 0.01705,-0.07338 z"
       id="path6" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#e01b24;stroke-width:0.264583"
       d="m 23.996985,36.337834 c -0.134607,0 -0.269503,0.05046 -0.40411,0.151412 -0.117781,0.08414 -0.218694,0.268972 -0.302824,0.555004 -0.08413,0.286041 -0.151575,0.698705 -0.202055,1.237134 -0.05047,0.53843 -0.07545,1.253315 -0.07545,2.145089 0,0.992728 0.01647,1.775061 0.05013,2.347144 0.05047,0.555256 0.109425,0.975899 0.176733,1.261938 0.08413,0.286042 0.18504,0.471392 0.302824,0.555522 0.134608,0.0673 0.277999,0.100769 0.429431,0.100769 0.117782,0 0.235169,-0.03347 0.35295,-0.100769 0.117781,-0.08414 0.219211,-0.269487 0.303341,-0.555522 0.08413,-0.302866 0.151056,-0.732004 0.201538,-1.28726 0.0673,-0.572081 0.101286,-1.345919 0.101286,-2.321822 0,-0.9086 -0.01698,-1.631981 -0.05064,-2.17041 -0.01683,-0.53843 -0.06729,-0.950575 -0.151412,-1.236617 -0.0673,-0.28604 -0.159716,-0.471393 -0.277502,-0.555522 -0.11778,-0.08414 -0.26915,-0.12609 -0.454236,-0.12609 z"
       id="path5" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#e01b24;stroke-width:0.264583"
       d="m 24.548889,26.910502 c -0.547838,0.71905 -1.056749,1.386293 -1.64176,2.154907 0.0503,0.112552 0.121098,0.209779 0.216007,0.288872 0.201911,0.168257 0.589088,0.252181 1.16117,0.252181 0.302867,0 0.55515,-0.05046 0.75706,-0.151412 0.218736,-0.100955 0.387096,-0.226837 0.504878,-0.378272 0.134612,-0.151433 0.227031,-0.319793 0.277503,-0.504879 0.05049,-0.168257 0.07545,-0.328124 0.07545,-0.479557 0,-0.201909 -0.02497,-0.370269 -0.07545,-0.504879 -0.03366,-0.134612 -0.126077,-0.252519 -0.277503,-0.353466 -0.134613,-0.100955 -0.344932,-0.184875 -0.630969,-0.252181 -0.101423,-0.02535 -0.233917,-0.04835 -0.366386,-0.07131 z"
       id="path4" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;fill:#e01b24;stroke-width:0.264583"
       d="m 29.885514,2.9429728 c -1.604954,0 -3.162554,0.1179607 -4.673099,0.3539836 -1.510547,0.1888183 -2.879408,0.471924 -4.106727,0.8495605 -1.180114,0.330432 -2.147911,0.7320154 -2.903181,1.2040609 -0.708071,0.4720457 -1.061951,0.9910728 -1.061951,1.5575277 0,0.6136593 0.04718,1.4870855 0.141593,2.6199951 0.09441,1.0857054 0.377515,2.1478684 0.849561,3.1863684 v -0.0708 c 0.61366,-0.330433 1.321942,-0.61354 2.124418,-0.849561 0.849683,-0.283228 1.698999,-0.519665 2.548682,-0.708484 0.896886,-0.188816 1.74672,-0.330369 2.549198,-0.42478 0.802478,-0.09441 1.487167,-0.141593 2.053621,-0.141593 1.274523,0 2.289502,0.330289 3.044776,0.991154 0.755271,0.613658 1.132747,1.534268 1.132747,2.761588 0,1.463341 -0.448252,2.997347 -1.345137,4.602303 -0.896886,1.557752 -2.029825,3.233828 -3.398759,5.0276 -0.18955,0.248376 -0.432372,0.568106 -0.627352,0.823723 0.708766,0.189127 1.277051,0.452923 1.704289,0.792199 0.572079,0.454299 0.858345,1.17768 0.858345,2.17041 0,0.622558 -0.09242,1.203066 -0.277502,1.741496 -0.168261,0.555256 -0.44603,1.03485 -0.833024,1.438672 -0.386997,0.403822 -0.883066,0.723552 -1.488798,0.959115 -0.605735,0.235562 -1.338129,0.353466 -2.196249,0.353466 -0.858121,0 -1.556016,-0.09242 -2.094446,-0.277502 -0.323259,-0.101018 -0.598806,-0.222777 -0.837158,-0.360185 -0.717017,1.004402 -1.412925,2.061524 -2.092379,3.160014 0.08202,0.0937 0.13999,0.192215 0.168466,0.296623 0.0673,0.185086 0.101285,0.353445 0.101285,0.504879 0,0.218735 -0.05046,0.454543 -0.151412,0.706933 -0.100955,0.252389 -0.235849,0.470689 -0.404109,0.655774 -0.257925,-0.141859 -0.525875,-0.253344 -0.803569,-0.335897 -0.07676,0.133971 -0.155272,0.263681 -0.23151,0.398942 -0.377636,0.708069 -0.684337,1.321464 -0.920357,1.840715 -0.03023,0.06047 -0.05297,0.120925 -0.08165,0.181384 l 1.280025,1.297079 c 0.252389,0.28604 0.454215,0.555312 0.605648,0.807702 0.168259,0.252389 0.303154,0.496175 0.40411,0.731739 0.100955,0.235562 0.167886,0.487844 0.201538,0.757059 0.03365,0.252389 0.05064,0.538653 0.05064,0.858346 0,0.797813 -0.192632,1.470232 -0.568957,2.022615 h 2.008663 c -0.198509,-0.416337 -0.359941,-0.927746 -0.480591,-1.543058 -0.151433,-0.874948 -0.227376,-2.018971 -0.227376,-3.432349 0,-2.288325 0.362207,-3.945926 1.085722,-4.972306 0.723515,-1.043209 1.758128,-1.564762 3.104203,-1.564762 0.673036,0 1.253543,0.100913 1.741496,0.302824 0.504779,0.185085 0.916926,0.521806 1.236617,1.009757 0.167879,0.256238 0.311051,0.561504 0.432531,0.910539 0.564751,-0.873977 1.136428,-1.707758 1.712557,-2.519226 v -4.146 c 0,-0.302868 0.03399,-0.538159 0.101286,-0.706417 0.08414,-0.168259 0.227011,-0.286163 0.428915,-0.353467 0.218735,-0.08414 0.512977,-0.134595 0.88315,-0.151412 0.370168,-0.01681 0.841785,-0.02532 1.413867,-0.02532 v 1.663981 c 1.443617,-1.824017 2.758392,-3.567302 3.926892,-5.21932 1.368933,-1.935389 2.50187,-3.84687 3.398759,-5.73505 0.896887,-1.888186 1.345138,-3.89455 1.345138,-6.018754 0,-3.2571159 -0.802132,-5.7353245 -2.407089,-7.4346888 C 36.70692,3.7928069 33.897902,2.9429728 29.885514,2.9429728 Z"
       id="text1-5" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;stroke-width:0.264582"
       d="m 16.122174,33.914792 q 1.060035,0 1.665768,0.176665 0.630972,0.151433 0.93384,0.403823 0.328106,0.227151 0.403823,0.504776 0.10095,0.27763 0.10095,0.504781 0,0.328104 -0.151434,0.706689 -0.151433,0.378584 -0.403823,0.656212 -0.504778,-0.277628 -1.060033,-0.403823 -0.530017,-0.126201 -1.110513,-0.126201 -1.186229,0 -1.186229,0.757168 0,0.201918 0.10095,0.479537 0.126196,0.277629 0.630973,0.782406 l 1.867681,1.892919 q 0.378584,0.429061 0.605733,0.807646 0.252389,0.378583 0.403823,0.731929 0.151434,0.353344 0.201912,0.757168 0.05048,0.378583 0.05048,0.858122 0,1.716247 -1.16099,2.675324 -1.135752,0.959079 -3.079147,0.959079 -0.605735,0 -1.160992,-0.07572 -0.530016,-0.07572 -0.933838,-0.227151 -0.378585,-0.176665 -0.630973,-0.454302 -0.227151,-0.302867 -0.227151,-0.73193 0,-0.302867 0.10095,-0.706687 0.10095,-0.429063 0.353345,-0.883364 0.530017,0.27763 1.085274,0.429063 0.580494,0.126206 1.110512,0.126206 0.656211,0 0.959078,-0.277629 0.328106,-0.302866 0.328106,-0.782404 0,-0.277629 -0.100949,-0.630975 -0.07571,-0.353341 -0.454299,-0.782402 L 13.16922,39.719746 q -0.656211,-0.706688 -0.933838,-1.413377 -0.277629,-0.706689 -0.277629,-1.261946 0,-0.65621 0.201912,-1.236707 0.227151,-0.580496 0.70669,-0.984318 0.479539,-0.429062 1.261946,-0.656212 0.807645,-0.252388 1.993873,-0.252388 z m 3.785856,6.536878 q 0,-3.432491 1.085273,-4.972063 1.085274,-1.564815 3.104388,-1.564815 1.009555,0 1.741485,0.302867 0.757169,0.277629 1.236706,1.009556 0.479539,0.73193 0.706689,1.968634 0.252389,1.236708 0.252389,3.154866 0,1.817202 -0.277627,3.104387 -0.252389,1.261944 -0.782407,2.069591 -0.504778,0.782406 -1.287184,1.160989 -0.782407,0.353345 -1.791963,0.353345 -1.034795,0 -1.791963,-0.252389 -0.731928,-0.22715 -1.236707,-0.908599 Q 20.38757,45.171347 20.13518,43.884162 19.90803,42.571738 19.90803,40.45167 Z m 3.104386,-0.02522 q 0,1.489094 0.05049,2.347219 0.07571,0.832885 0.176672,1.261944 0.12619,0.429063 0.302866,0.555258 0.201912,0.10095 0.429061,0.10095 0.176673,0 0.353346,-0.10095 0.176671,-0.126205 0.302866,-0.555258 0.126191,-0.4543 0.201914,-1.287184 0.100949,-0.858123 0.100949,-2.321979 0,-1.362901 -0.05049,-2.170546 -0.02525,-0.807645 -0.151433,-1.236709 -0.10095,-0.42906 -0.27763,-0.555253 -0.176669,-0.126207 -0.454299,-0.126207 -0.201911,0 -0.403822,0.151433 -0.176672,0.126207 -0.302867,0.555256 -0.126192,0.429061 -0.201912,1.236706 -0.07571,0.807645 -0.07571,2.145308 z m 9.035532,5.855428 q 0,0.201918 -0.05048,0.302867 -0.05049,0.10095 -0.328107,0.151432 -0.252388,0.02522 -0.832884,0.05048 -0.555255,0 -1.61529,0 V 29.472758 q 0,-0.454302 0.10095,-0.70669 0.126207,-0.252389 0.429063,-0.353345 0.328104,-0.126207 0.883364,-0.151432 0.555253,-0.02522 1.413377,-0.02522 z m 4.542992,0 q 0,0.201918 -0.05048,0.302867 -0.05048,0.10095 -0.328105,0.151432 -0.252387,0.02522 -0.858123,0.05048 -0.580496,0 -1.640529,0 V 35.403905 q 0,-0.454301 0.126207,-0.70669 0.126206,-0.252389 0.42906,-0.353344 0.328107,-0.126208 0.883363,-0.151432 0.555256,-0.02522 1.438617,-0.02522 z m -2.751041,-15.79957 q 0,-0.883364 0.353345,-1.413381 0.378583,-0.555256 1.186229,-0.555256 0.782406,0 1.060035,0.403822 0.277627,0.403822 0.277627,1.438619 0,1.034796 -0.403822,1.615289 -0.378585,0.555257 -1.110512,0.555257 -0.630974,0 -1.009557,-0.42906 -0.353345,-0.429065 -0.353345,-1.61529 z m 9.111255,5.981622 q -0.201919,-0.126207 -0.530017,-0.126207 -0.201919,0 -0.429061,0.10095 -0.201921,0.10095 -0.378586,0.530017 -0.176663,0.429061 -0.302866,1.312422 -0.126207,0.858124 -0.126207,2.422936 0,1.135751 0.05048,1.867681 0.05049,0.731929 0.151432,1.186229 0.126206,0.42906 0.302866,0.605734 0.176664,0.176664 0.429063,0.176664 0.504775,0 0.832883,-0.252387 z m 0,-6.991181 q 0,-0.4543 0.10095,-0.70669 0.126207,-0.252388 0.429061,-0.353345 0.302869,-0.126207 0.858123,-0.151433 0.555256,-0.02522 1.438619,-0.02522 v 18.045824 q -0.656213,0.277629 -1.564813,0.504778 -0.883361,0.252389 -2.120069,0.252389 -0.807645,0 -1.539574,-0.176664 -0.731928,-0.176665 -1.312423,-0.807647 -0.555257,-0.630971 -0.908601,-1.791962 -0.328107,-1.186229 -0.328107,-3.205343 0,-1.943398 0.252392,-3.306295 0.277625,-1.362903 0.731925,-2.195787 0.479541,-0.858125 1.110513,-1.236708 0.630973,-0.403822 1.362901,-0.403822 0.504781,0 0.883363,0.126206 0.378584,0.126206 0.605734,0.328105 z"
       id="text1-2"
       aria-label="solid" />
    <path
       style="font-weight:bold;font-size:40px;line-height:1.25;font-family:'Yanone Kaffeesatz';-inkscape-font-specification:'Yanone Kaffeesatz Bold';white-space:pre;stroke-width:0.264582"
       d="m 8.4087612,14.362267 q 1.0600348,0 1.6657678,0.176671 0.630974,0.151434 0.933842,0.403823 0.328105,0.227151 0.403821,0.504778 0.100961,0.277629 0.100961,0.504778 0,0.328106 -0.151435,0.70669 -0.151432,0.378584 -0.403822,0.656212 Q 10.45312,17.037592 9.8978634,16.911398 9.367846,16.785201 8.7873503,16.785201 q -1.1862281,0 -1.1862281,0.757168 0,0.201912 0.1009491,0.479539 0.1261961,0.277628 0.630973,0.782408 l 1.8676787,1.892917 q 0.378584,0.429063 0.605735,0.807646 0.252389,0.378585 0.403823,0.731929 0.151435,0.353343 0.201913,0.757168 0.05048,0.378585 0.05048,0.858121 0,1.716248 -1.160992,2.675326 -1.1357519,0.959079 -3.0791481,0.959079 -0.6057343,0 -1.1609903,-0.07571 Q 5.531529,27.335078 5.1277058,27.18364 4.7491223,27.006974 4.4967329,26.729339 4.2695831,26.426473 4.2695831,25.99741 q 0,-0.302866 0.1009537,-0.706689 0.1009537,-0.429063 0.353345,-0.883363 0.5300174,0.27763 1.0852734,0.429062 0.5804947,0.126206 1.1105112,0.126206 0.6562125,0 0.9590802,-0.277629 0.3281053,-0.302867 0.3281053,-0.782406 0,-0.277629 -0.10095,-0.630974 -0.075712,-0.353345 -0.4543005,-0.782408 l -2.195793,-2.321998 q -0.6562116,-0.70669 -0.9338396,-1.41338 -0.277628,-0.706689 -0.277628,-1.261945 0,-0.656212 0.201912,-1.236707 0.2271498,-0.580496 0.7066889,-0.984318 0.4795392,-0.429062 1.261946,-0.656212 0.8076445,-0.252388 1.9938735,-0.252388 z m 3.6596628,1.085273 q -0.07573,-0.302867 -0.05048,-0.47954 0.02523,-0.176672 0.302868,-0.252389 0.302866,-0.07571 0.959078,-0.07571 0.656212,-0.02525 1.867679,-0.02525 l 0.454302,3.634403 q 0.100951,0.807646 0.176672,1.867681 0.10095,1.034794 0.176672,1.968634 0.10095,1.085274 0.151432,2.195787 h 0.05048 q 0.05049,-1.110513 0.151431,-2.195787 0.05048,-0.93384 0.126191,-1.968634 0.10095,-1.060035 0.201912,-1.867681 l 0.353344,-3.079147 q 0.02525,-0.201913 0.07572,-0.302867 0.07571,-0.126195 0.353344,-0.176672 0.277629,-0.05048 0.858124,-0.05048 0.605733,-0.02523 1.691006,-0.02523 l -2.523886,12.619458 q -0.429063,0.07571 -1.034796,0.10095 -0.605735,0.02522 -1.009558,0.02522 -0.555255,0 -0.807645,-0.353343 -0.252398,-0.378578 -0.378592,-0.908596 z m 12.518489,-1.085273 q 0.605732,0 1.261947,0.22715 h 3.003429 q 0.126206,0.227151 0.201918,0.580495 0.10095,0.328106 0.10095,0.807645 0,0.555257 -0.252389,0.807645 -0.252388,0.227151 -0.630972,0.227151 -0.126207,0 -0.25239,0 -0.126207,-0.02523 -0.277626,-0.05048 0.277626,0.429062 0.429058,0.984319 0.176666,0.555254 0.176666,1.287183 0,2.044353 -0.95908,3.079148 -0.933838,1.034794 -3.129625,1.034794 -0.201919,0 -0.353347,0 -0.151432,0 -0.328103,-0.02522 -0.302868,0.429064 -0.302868,0.706691 0,0.302865 0.630971,0.353345 0.630973,0.02522 1.539574,0.176664 1.615293,0.277629 2.473415,0.95908 0.858122,0.681449 0.858122,2.170547 0,0.933838 -0.277626,1.741485 -0.252391,0.832884 -0.832884,1.438618 -0.580495,0.605734 -1.489096,0.959078 -0.908603,0.353345 -2.195786,0.353345 -1.287185,0 -2.09483,-0.277629 -0.807645,-0.252388 -1.261947,-0.65621 -0.429062,-0.403825 -0.580494,-0.908601 -0.151433,-0.504781 -0.151433,-0.984317 0,-0.883363 0.454301,-1.615294 0.479538,-0.706685 1.236706,-1.236703 -0.65621,-0.201921 -1.034793,-0.555255 -0.353346,-0.353346 -0.302868,-0.883363 0.02522,-0.530017 0.378583,-1.110513 0.378585,-0.580495 1.186227,-1.236707 -0.807642,-0.555258 -1.160988,-1.4891 -0.328105,-0.959078 -0.328105,-2.170546 0,-1.337663 0.277627,-2.246264 0.302865,-0.908601 0.858124,-1.438618 0.555255,-0.555257 1.337661,-0.782407 0.807646,-0.22715 1.791964,-0.22715 z m -0.126191,1.993874 q -0.504778,0 -0.832884,0.555257 -0.302867,0.530016 -0.302867,2.019113 0,1.337662 0.227149,1.842439 0.227151,0.479541 0.832884,0.479541 0.277629,0 0.479542,-0.10095 0.227151,-0.126206 0.353343,-0.42906 0.151432,-0.302867 0.20192,-0.832884 0.07571,-0.555257 0.07571,-1.41338 0,-1.211467 -0.227151,-1.665769 -0.227149,-0.454299 -0.807644,-0.454299 z m 1.438619,11.736094 q 0,-0.302864 -0.07571,-0.504778 -0.05049,-0.20192 -0.277629,-0.353343 -0.20192,-0.151432 -0.630976,-0.252391 -0.40382,-0.10095 -1.13575,-0.176665 -0.42906,0.328107 -0.706689,0.782406 -0.252388,0.479541 -0.252388,1.034797 0,0.479538 0.302867,0.73193 0.302866,0.252388 1.160989,0.252388 0.454301,0 0.757166,-0.151432 0.328107,-0.151432 0.504781,-0.378584 0.201918,-0.22715 0.277625,-0.504779 0.07573,-0.252388 0.07573,-0.479538 z"
       id="text1"
       aria-label="svg" />
  </g>
</svg>
`;

const App = (() => {
  const { scene, camera, controls } = setupScene(document.querySelector('#sceneContainer'));
  var state = {
    scene,
    camera,
    controls,
  };

  const fitCamera = () => {
    const boundingBox = new THREE.Box3().setFromObject(state.extrusions);
    const center = boundingBox.getCenter(new THREE.Vector3());
    const size = boundingBox.getSize(new THREE.Vector3());
    const offset = 0.5;
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2)) * offset;
    const minZ = boundingBox.min.z;
    const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

    state.controls.target = center;
    state.controls.maxDistance = cameraToFarEdge * 2;
    state.controls.minDistance = cameraToFarEdge * 0.5;
    state.controls.saveState();
    state.camera.position.z = cameraZ;
    state.camera.far = cameraToFarEdge * 3;
    state.camera.updateProjectionMatrix();
  };

  const loadSvg = (svgData) => {
    const { object, update, byColor } = renderSVG(svgData);
    while (state.scene.children.length > 0) {
      state.scene.remove(state.scene.children[0]);
    }
    state.extrusions = object;
    state.scene.add(object);
    state.sceneUpdate = update;
    state.byColor = byColor;
  };

  const renderDepthInputs = () => {
    const depthsContainer = document.querySelector('#depths');
    depthsContainer.innerHTML = '';
    for (const [color, colorShapeData] of state.byColor) {
      const item = document.createElement('li');
      const label = document.createElement('label');
      const swatch = document.createElement('span');
      const input = document.createElement('input');
      label.innerHTML = color;
      label.setAttribute('for', color);
      swatch.setAttribute('style', `background-color: #${color}`);
      input.setAttribute('type', 'number');
      input.setAttribute('step', '0.1');
      input.setAttribute('id', color);
      input.value = colorShapeData[0].depth;
      input.addEventListener('input', (event) => {
        state.sceneUpdate(Number(event.currentTarget.value), color);
      });

      item.appendChild(label);
      item.appendChild(swatch);
      item.appendChild(input);
      depthsContainer.appendChild(item);
    }
  };

  const download = () => {
    const exporter = new STLExporter();
    const zip = new JSZip();
    for (const [color, colorShapeData] of state.byColor) {
      const scene = new THREE.Scene();
      colorShapeData.forEach((data) => {
        scene.add(data.mesh);
      });
      const result = exporter.parse(scene, { binary: false });
      zip.file(`${color}.stl`, result);
    }
    zip
      .generateAsync({
        type: 'blob',
      })
      .then(function (content) {
        saveAs(content, 'svg2solid.zip');
      });
  };

  return {
    loadSvg,
    fitCamera,
    renderDepthInputs,
    download,
  };
})();

App.loadSvg(exampleSvgData);
App.renderDepthInputs();
App.fitCamera();

const svgFileInput = document.querySelector('#svgFile');
const downloadButton = document.querySelector('#download');

svgFileInput.addEventListener('change', function (event) {
  var reader = new FileReader();
  reader.onload = function (event) {
    App.loadSvg(event.target.result);
    App.renderDepthInputs();
    App.fitCamera();
  };
  reader.readAsText(event.target.files[0]);
});

downloadButton.addEventListener('click', () => {
  App.download();
});

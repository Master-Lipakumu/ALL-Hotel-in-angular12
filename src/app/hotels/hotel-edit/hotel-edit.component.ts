import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, EMPTY, fromEvent, merge, Observable, timer } from 'rxjs';
import { Ihotel } from '../shared/models/hotel';
import { HotelListService } from '../shared/services/hotel-list.service';
import { GenericValidator } from '../shared/validators/global-generic.validators';
import { NumberValidators } from '../shared/validators/numbers.validators';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  inputElements!: ElementRef[];



  public hotelForm!: FormGroup;
  public hotel!:Ihotel;
  public pageTitle!:string;
  public errorMessage!:null;

  private validationMessages:{[key:string]:{[key:string]:string}}={
    hotelName:{
      required:"le nom de l'hotel est obligatoire",
      minlength:" le nom doit avoir au moin 4 charactères"
    },
    hotelprice:{
      required:"le prix de l'hotel est obligatoire",
      pattern:"le prix de l'hotel doit etre un nombre"
    },
    rating:{
      range: 'Donnez une note comprise entre 1 et 5'
    }
  };

  private isFormSubmitted: boolean = false;
  constructor(
    private fb:FormBuilder,

    private route:ActivatedRoute,

    private hotelService:HotelListService,

    private router:Router,

    private GenericValidator: GenericValidator,

     ) { }



  ngAfterViewInit(): void {
    const formControlBlurs:Observable<unknown>[] = this.inputElements.map(
      (formControlElemRef:ElementRef)=>fromEvent(formControlElemRef.nativeElement,'blur')
      );
      merge(
        this.hotelForm.valueChanges,
        ...formControlBlurs
        ).pipe(
        debounce(()=>this.isFormSubmitted?EMPTY:timer(800))).subscribe(
        ()=>{
          this.formErrors=this.GenericValidator.createErrorMessage(this.hotelForm, this.isFormSubmitted);
        }
      )
  }

  ngOnInit(): void {
    this.GenericValidator = new GenericValidator(this.validationMessages);

    this.hotelForm = this.fb.group({
      hotelName:['', [Validators.required, Validators.minLength(4)]],
      hotelprice: ['', [Validators.required,Validators.pattern(/^-?(0|[1-9]\*)?$/)]],
      rating:(['', NumberValidators.range(1,5)]),
      hoteldescription:[''],
      tags:this.fb.array([])
    });

    this.route.paramMap.subscribe(params => {
       const id = Number(params.get('id'));
       this.getSelectedHotel(id);
    });



  }

  public formErrors:{[key:string]:string} = {};

  public displayHotel(hotel:Ihotel): void{

    this.hotel = hotel;

    if(this.hotel.id === 0){
      this.pageTitle="crée un hotel";
    }
    else
    {
      this.pageTitle=`modifier l\'hotel ${this.hotel.hotelname}`;
    }

    this.hotelForm.patchValue({
      hotelName: this.hotel.hotelname,
      hotelprice: this.hotel.hotelprice,
      rating: this.hotel.rating,
      hoteldescription: this.hotel.hoteldescription,
      hotelImage: this.hotel.hotelimage
    });
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags||[]));
  }
/* ceci ne fonctionne pas bien */
  public getSelectedHotel(id:number): void{
    this.hotelService.getHotelById(id).subscribe((hotel:Ihotel) => {
      this.displayHotel(hotel);
    });
  }
/* ###############################################################*/
  public saveHotel(): void{
    this.isFormSubmitted=true;
    this.hotelForm.updateValueAndValidity({
      onlySelf:true,
      emitEvent:true
    });
    if(this.hotelForm.valid){
      if(this.hotelForm.dirty){
        const hotel:Ihotel={
          ... this.hotel,
          ... this.hotelForm.value
        };
        if(hotel.id === 0){
          this.hotelService.createHotel(hotel).subscribe({
            next:()=>this.saveCompleted(),
            error:(err)=>this.errorMessage = err
          });
        }else{
          this.hotelService.updateHotel(hotel).subscribe({
            next:()=> this.saveCompleted(),
            error:(err)=>this.errorMessage = err
          });
        }
      }
    }
    else
    {
      const errorMessage = 'corrigez les erreurs s\'il vous plait'
    }

  }
  public saveCompleted(): void{
    this.hotelForm.reset();
    this.router.navigate(['/hotels'])
  }

  public deleteHotel():void{
    if(confirm(`voulez-vous vraiment supprimer ${this.hotel.hotelname}`)){
      this.hotelService.deleteHotel(this.hotel.id).subscribe({
        next:()=>this.saveCompleted()
      });
    }
  }

  public get tags():FormArray{
    return this.hotelForm.get('tags') as FormArray;
  }

  public addTags():void{
    this.tags.push(new FormControl());
  }

  public deleteTag(index:number):void{
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

 public HiddenError():void{

   this.errorMessage = null;

 }
}
